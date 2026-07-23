from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from accounts.models import User

from .models import Lead
from .serializers import LeadSerializer
from .permissions import IsLeadOwnerOrAdmin
from .status_serializer import LeadStatusSerializer
from .services import validate_status_transition

from activities.services import (
    create_activity_log
)

from notifications.services import (
    create_notification
)


# ==========================================
# Lead List & Create
# ==========================================

class LeadListCreateView(
    generics.ListCreateAPIView
):

    serializer_class = LeadSerializer

    permission_classes = [
        IsAuthenticated
    ]

    # Disable pagination
    pagination_class = None

    filter_backends = [
        filters.SearchFilter
    ]

    search_fields = [
        "customer__name",
        "status",
        "priority",
    ]

    filterset_fields = [
        "status",
        "priority",
        "assigned_to",
    ]

    def get_queryset(self):

        user = self.request.user

        # ==========================
        # Admin
        # ==========================

        if user.role == "ADMIN":

            return Lead.objects.all().order_by(
                "-created_at"
            )

        # ==========================
        # Manager & Sales Executive
        # ==========================

        return Lead.objects.filter(
            assigned_to=user
        ).order_by(
            "-created_at"
        )

    def perform_create(
        self,
        serializer
    ):

        # ==================================
        # Sales Executive
        # Auto Assign To Self
        # ==================================

        if self.request.user.role == "SALES_EXECUTIVE":

            lead = serializer.save(

                created_by=self.request.user,

                assigned_to=self.request.user,

            )

        # ==================================
        # Admin & Manager
        # ==================================

        else:

            lead = serializer.save(

                created_by=self.request.user,

            )

        # ==================================
        # Activity Log
        # ==================================

        create_activity_log(

            user=self.request.user,

            action_type="LEAD_CREATED",

            description=

            f"{self.request.user.username} "

            f"created lead "

            f"'{lead.customer.name}'."

        )

        # ==================================
        # Notification
        # ==================================

        create_notification(

            user=self.request.user,

            title="Lead Created",

            message=

            f"Lead '{lead.customer.name}' "

            f"created successfully."

        )

# ==========================================
# Lead Detail
# View
# Update
# Delete
# ==========================================

class LeadDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = LeadSerializer

    permission_classes = [

        IsAuthenticated,

        IsLeadOwnerOrAdmin,

    ]

    def get_queryset(self):

        user = self.request.user

        # ==================================
        # Admin
        # ==================================

        if user.role == "ADMIN":

            return Lead.objects.all()

        # ==================================
        # Manager & Sales Executive
        # ==================================

        return Lead.objects.filter(
            assigned_to=user
        )

    # ======================================
    # Update Lead
    # ======================================

    def perform_update(
        self,
        serializer
    ):

        lead = serializer.save()

        create_activity_log(

            user=self.request.user,

            action_type="LEAD_UPDATED",

            description=

            f"{self.request.user.username} "

            f"updated lead "

            f"'{lead.customer.name}'."

        )

        # No notification
        # Same behavior as Customer module

    # ======================================
    # Delete Lead
    # ======================================

    def perform_destroy(
        self,
        instance
    ):

        # ------------------------------
        # Sales Executive
        # Cannot Delete
        # ------------------------------

        if self.request.user.role == "SALES_EXECUTIVE":

            raise PermissionDenied(

                "Sales Executives cannot delete leads."

            )

        # ------------------------------
        # Manager
        # Only Own Created Leads
        # ------------------------------

        if (

            self.request.user.role == "MANAGER"

            and

            instance.created_by != self.request.user

        ):

            raise PermissionDenied(

                "Managers can delete only their own leads."

            )

        customer_name = instance.customer.name

        # ------------------------------
        # Activity Log
        # ------------------------------

        create_activity_log(

            user=self.request.user,

            action_type="LEAD_DELETED",

            description=

            f"{self.request.user.username} "

            f"deleted lead "

            f"'{customer_name}'."

        )

        # No notification
        # Same behavior as Customer module

        instance.delete()

        # ==========================================
# Lead Status Update
# NEW
# CONTACTED
# QUALIFIED
# CONVERTED
# CLOSED
# ==========================================

class LeadStatusUpdateView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def patch(
        self,
        request,
        pk
    ):

        user = request.user

        # ==================================
        # Get Lead
        # ==================================

        if user.role == "ADMIN":

            lead = get_object_or_404(

                Lead,

                pk=pk,

            )

        else:

            lead = get_object_or_404(

                Lead,

                pk=pk,

                assigned_to=user,

            )

        # ==================================
        # Validate Request
        # ==================================

        serializer = LeadStatusSerializer(

            data=request.data

        )

        serializer.is_valid(

            raise_exception=True

        )

        new_status = serializer.validated_data[
            "status"
        ]

        # ==================================
        # Validate Transition
        # ==================================

        if not validate_status_transition(

            lead.status,

            new_status,

        ):

            return Response(

                {
                    "error":
                    "Invalid status transition."
                },

                status=400,

            )

        # ==================================
        # Save Old Status
        # ==================================

        old_status = lead.status

        # ==================================
        # Update Status
        # ==================================

        lead.status = new_status

        lead.save()

        # ==================================
        # Activity Log
        # ==================================

        create_activity_log(

            user=request.user,

            action_type="LEAD_STATUS_CHANGED",

            description=

            f"{request.user.username} "

            f"changed lead "

            f"'{lead.customer.name}' "

            f"from "

            f"{old_status} "

            f"to "

            f"{new_status}."

        )

        # ==================================
        # Notification To Assigned User
        # ==================================

        create_notification(

            user=lead.assigned_to,

            title="Lead Status Updated",

            message=

            f"Lead '{lead.customer.name}' "

            f"changed from "

            f"{old_status} "

            f"to "

            f"{new_status}."

        )

        # ==================================
        # Notification To Creator
        # (If Different User)
        # ==================================

        if lead.created_by != lead.assigned_to:

            create_notification(

                user=lead.created_by,

                title="Lead Status Updated",

                message=

                f"Lead '{lead.customer.name}' "

                f"changed from "

                f"{old_status} "

                f"to "

                f"{new_status}."

            )

        return Response(

            {
                "message":
                f"Lead moved to {new_status}."
            }

        )

    # ==========================================
# Lead Assignment
# Admin & Manager Only
# ==========================================

class LeadAssignView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def patch(
        self,
        request,
        pk
    ):

        # ==================================
        # Permission
        # ==================================

        if request.user.role not in [

            "ADMIN",

            "MANAGER",

        ]:

            return Response(

                {
                    "error":
                    "Only Admin or Manager can assign leads."
                },

                status=403

            )

        # ==================================
        # Get Lead
        # ==================================

        if request.user.role == "ADMIN":

            lead = get_object_or_404(

                Lead,

                pk=pk,

            )

        else:

            lead = get_object_or_404(

                Lead,

                pk=pk,

                assigned_to=request.user,

            )

        # ==================================
        # Assigned User
        # ==================================

        user_id = request.data.get(
            "assigned_to"
        )

        if not user_id:

            return Response(

                {
                    "error":
                    "assigned_to is required."
                },

                status=400

            )

        user = get_object_or_404(

            User,

            pk=user_id,

            role="SALES_EXECUTIVE",

        )

        # ==================================
        # Assign
        # ==================================

        old_user = lead.assigned_to

        lead.assigned_to = user

        lead.save()

        # ==================================
        # Activity Log
        # ==================================

        create_activity_log(

            user=request.user,

            action_type="LEAD_ASSIGNED",

            description=

            f"{request.user.username} "

            f"assigned lead "

            f"'{lead.customer.name}' "

            f"to "

            f"{user.username}."

        )

        # ==================================
        # Notification
        # ==================================

        create_notification(

            user=user,

            title="New Lead Assigned",

            message=

            f"Lead '{lead.customer.name}' "

            f"has been assigned to you "

            f"by "

            f"{request.user.username}."

        )

        # Notify previous assignee (optional)

        if old_user and old_user != user:

            create_notification(

                user=old_user,

                title="Lead Reassigned",

                message=

                f"Lead '{lead.customer.name}' "

                f"has been reassigned "

                f"by "

                f"{request.user.username}."

            )

        return Response(

            {

                "message":

                f"Lead assigned to "

                f"{user.username}."

            }

        )


# ==========================================
# My Leads
# ==========================================

class MyLeadsView(
    generics.ListAPIView
):

    serializer_class = LeadSerializer

    permission_classes = [
        IsAuthenticated
    ]

    pagination_class = None

    def get_queryset(
        self
    ):

        return Lead.objects.filter(

            assigned_to=self.request.user

        ).order_by(

            "-created_at"

        )