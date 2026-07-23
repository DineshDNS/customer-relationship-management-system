from rest_framework import generics
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Deal
from .serializers import DealSerializer
from .permissions import IsDealOwnerOrAdminOrManager

from .services import validate_stage_transition
from .stage_serializer import DealStageSerializer

from activities.services import create_activity_log
from notifications.services import create_notification

from accounts.models import User


# =====================================
# Deal List & Create
# =====================================

class DealListCreateView(
    generics.ListCreateAPIView
):

    serializer_class = DealSerializer

    permission_classes = [
        IsAuthenticated
    ]

    filter_backends = [
        filters.SearchFilter
    ]

    search_fields = [
        "deal_name",
        "stage",
        "lead__customer__name",
    ]

    def get_queryset(self):

        user = self.request.user

        # -----------------------------
        # Admin
        # -----------------------------
        if user.role == "ADMIN":

            return Deal.objects.all().order_by(
                "-created_at"
            )

        # -----------------------------
        # Manager
        # -----------------------------
        if user.role == "MANAGER":

            return Deal.objects.all().order_by(
                "-created_at"
            )

        # -----------------------------
        # Sales Executive
        # -----------------------------
        return Deal.objects.filter(
            assigned_to=user
        ).order_by(
            "-created_at"
        )

    def perform_create(
        self,
        serializer
    ):

        deal = serializer.save(
            created_by=self.request.user
        )

        # Activity
        create_activity_log(

            user=self.request.user,

            action_type="DEAL_CREATED",

            description=(
                f"Deal '{deal.deal_name}' created."
            )

        )

        # Notification
        create_notification(

            user=self.request.user,

            title="Deal Created",

            message=(
                f"Deal '{deal.deal_name}' has been created successfully."
            )

        )

# =====================================
# Deal Detail
# Retrieve
# Update
# Delete
# =====================================

class DealDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Deal.objects.all()

    serializer_class = DealSerializer

    permission_classes = [
        IsAuthenticated,
        IsDealOwnerOrAdminOrManager,
    ]

    # -----------------------------
    # Update Deal
    # -----------------------------

    def perform_update(
        self,
        serializer
    ):

        # Sales Executive cannot edit
        if (
            self.request.user.role
            == "SALES_EXECUTIVE"
        ):

            raise PermissionDenied(
                "Sales Executives cannot update deals."
            )

        deal = serializer.save()

        # Activity Log
        create_activity_log(

            user=self.request.user,

            action_type="DEAL_UPDATED",

            description=(
                f"Deal '{deal.deal_name}' updated."
            )

        )

        # Notify Assigned User
        if deal.assigned_to:

            create_notification(

                user=deal.assigned_to,

                title="Deal Updated",

                message=(
                    f"Deal '{deal.deal_name}' has been updated."
                )

            )

        # Notify Creator
        if (
            deal.created_by
            != deal.assigned_to
        ):

            create_notification(

                user=deal.created_by,

                title="Deal Updated",

                message=(
                    f"Your deal '{deal.deal_name}' was updated."
                )

            )

    # -----------------------------
    # Delete Deal
    # -----------------------------

    def perform_destroy(
        self,
        instance
    ):

        if (
            self.request.user.role
            == "SALES_EXECUTIVE"
        ):

            raise PermissionDenied(
                "Sales Executives cannot delete deals."
            )

        # Activity Log
        create_activity_log(

            user=self.request.user,

            action_type="DEAL_DELETED",

            description=(
                f"Deal '{instance.deal_name}' deleted."
            )

        )

        # Notify Assigned User
        if instance.assigned_to:

            create_notification(

                user=instance.assigned_to,

                title="Deal Deleted",

                message=(
                    f"Deal '{instance.deal_name}' has been deleted."
                )

            )

        # Notify Creator
        if (
            instance.created_by
            != instance.assigned_to
        ):

            create_notification(

                user=instance.created_by,

                title="Deal Deleted",

                message=(
                    f"Your deal '{instance.deal_name}' was deleted."
                )

            )

        instance.delete()

# =====================================
# Deal Assign
# =====================================

class DealAssignView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def patch(
        self,
        request,
        pk
    ):

        try:

            deal = Deal.objects.get(
                pk=pk
            )

        except Deal.DoesNotExist:

            return Response(
                {
                    "error": "Deal not found."
                },
                status=404
            )

        # ---------------------------------
        # Permission
        # ---------------------------------

        if request.user.role not in [
            "ADMIN",
            "MANAGER",
        ]:

            raise PermissionDenied(
                "Only Admin or Manager can assign deals."
            )

        assigned_to = request.data.get(
            "assigned_to"
        )

        if not assigned_to:

            return Response(
                {
                    "error": "assigned_to is required."
                },
                status=400
            )

        try:

            new_user = User.objects.get(
                id=assigned_to
            )

        except User.DoesNotExist:

            return Response(
                {
                    "error": "Selected user does not exist."
                },
                status=404
            )

        # ---------------------------------
        # Manager Restrictions
        # ---------------------------------

        if (

            request.user.role
            == "MANAGER"

            and

            new_user.role
            != "SALES_EXECUTIVE"

        ):

            raise PermissionDenied(

                "Managers can assign deals only to Sales Executives."

            )

        # ---------------------------------
        # Save Previous Assignee
        # ---------------------------------

        previous_user = deal.assigned_to

        # ---------------------------------
        # Assign Deal
        # ---------------------------------

        deal.assigned_to = new_user

        deal.save()

        # ---------------------------------
        # Activity
        # ---------------------------------

        create_activity_log(

            user=request.user,

            action_type="DEAL_ASSIGNED",

            description=(
                f"Assigned deal "
                f"'{deal.deal_name}' "
                f"to {new_user.username}."
            )

        )

        # ---------------------------------
        # Notification
        # New Assignee
        # ---------------------------------

        create_notification(

            user=new_user,

            title="New Deal Assigned",

            message=(
                f"You have been assigned "
                f"'{deal.deal_name}'."
            )

        )

        # ---------------------------------
        # Previous Assignee
        # ---------------------------------

        if (

            previous_user

            and

            previous_user != new_user

        ):

            create_notification(

                user=previous_user,

                title="Deal Reassigned",

                message=(
                    f"'{deal.deal_name}' "
                    f"has been reassigned."
                )

            )

        return Response(

            {
                "message":
                "Deal assigned successfully."
            }

        )

    # =====================================
# Deal Stage Update
# =====================================

class DealStageUpdateView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def patch(
        self,
        request,
        pk
    ):

        try:

            deal = Deal.objects.get(
                pk=pk
            )

        except Deal.DoesNotExist:

            return Response(
                {
                    "error": "Deal not found."
                },
                status=404
            )

        # ---------------------------------
        # Permission
        # ---------------------------------

        if request.user.role not in [
            "ADMIN",
            "MANAGER",
        ]:

            raise PermissionDenied(
                "Only Admin or Manager can update deal stage."
            )

        serializer = DealStageSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        new_stage = serializer.validated_data[
            "stage"
        ]

        # ---------------------------------
        # Validate Stage Flow
        # ---------------------------------

        if not validate_stage_transition(
            deal.stage,
            new_stage
        ):

            return Response(
                {
                    "error":
                    "Invalid stage transition."
                },
                status=400
            )

        old_stage = deal.stage

        deal.stage = new_stage

        deal.save()

        # ---------------------------------
        # Activity
        # ---------------------------------

        create_activity_log(

            user=request.user,

            action_type="DEAL_STAGE_UPDATED",

            description=(
                f"Deal '{deal.deal_name}' "
                f"changed from "
                f"{old_stage} "
                f"to "
                f"{new_stage}."
            )

        )

        # ---------------------------------
        # Assigned User Notification
        # ---------------------------------

        if deal.assigned_to:

            create_notification(

                user=deal.assigned_to,

                title="Deal Stage Updated",

                message=(
                    f"'{deal.deal_name}' "
                    f"moved to "
                    f"{new_stage}."
                )

            )

        # ---------------------------------
        # Creator Notification
        # ---------------------------------

        if (

            deal.created_by

            and

            deal.created_by != deal.assigned_to

        ):

            create_notification(

                user=deal.created_by,

                title="Deal Stage Updated",

                message=(
                    f"Your deal "
                    f"'{deal.deal_name}' "
                    f"is now "
                    f"{new_stage}."
                )

            )

        # ---------------------------------
        # WON
        # ---------------------------------

        if new_stage == "WON":

            if deal.assigned_to:

                create_notification(

                    user=deal.assigned_to,

                    title="🎉 Congratulations!",

                    message=(
                        f"Deal "
                        f"'{deal.deal_name}' "
                        f"has been marked as WON."
                    )

                )

        # ---------------------------------
        # LOST
        # ---------------------------------

        if new_stage == "LOST":

            if deal.assigned_to:

                create_notification(

                    user=deal.assigned_to,

                    title="Deal Lost",

                    message=(
                        f"Deal "
                        f"'{deal.deal_name}' "
                        f"has been marked as LOST."
                    )

                )

        return Response(

            {
                "message":
                "Deal stage updated successfully."
            }

        )