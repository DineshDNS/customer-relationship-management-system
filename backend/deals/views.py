from rest_framework import generics
from rest_framework import filters
from rest_framework.permissions import (
    IsAuthenticated
)
from rest_framework.exceptions import (
    PermissionDenied
)

from .models import Deal
from .serializers import DealSerializer
from .permissions import (
    IsDealOwnerOrAdminOrManager
)

from rest_framework.views import APIView
from rest_framework.response import Response

from .services import (
    validate_stage_transition
)

from .stage_serializer import (
    DealStageSerializer
)

from activities.services import (
    create_activity_log
)

from notifications.services import (
    create_notification
)

# ==============================
# Deal List & Create
# ==============================

class DealListCreateView(
    generics.ListCreateAPIView
):

    queryset = Deal.objects.all().order_by(
        "-created_at"
    )

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
    ]

    def perform_create(
        self,
        serializer
    ):

        deal = serializer.save(
            created_by=self.request.user
        )

        create_activity_log(

            user=self.request.user,

            action_type=
            "DEAL_CREATED",

            description=
            f"Deal '{deal.deal_name}' created"
        )

        create_notification(

            user=self.request.user,

            title="Deal Created",

            message=
            f"Deal '{deal.deal_name}' created."
        )


# ==============================
# Deal Detail
# Retrieve
# Update
# Delete
# ==============================

class DealDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Deal.objects.all()

    serializer_class = DealSerializer

    permission_classes = [
        IsAuthenticated,
        IsDealOwnerOrAdminOrManager,
    ]

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

        instance.delete()

# ==============================
# Deal Stage Update
# ==============================

class DealStageUpdateView(
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

        deal = Deal.objects.get(
            pk=pk
        )

        serializer = (
            DealStageSerializer(
                data=request.data
            )
        )

        serializer.is_valid(
            raise_exception=True
        )

        new_stage = (
            serializer.validated_data[
                "stage"
            ]
        )

        if not validate_stage_transition(
            deal.stage,
            new_stage
        ):
            return Response(
                {
                    "error":
                    "Invalid stage transition"
                },
                status=400
            )

        deal.stage = new_stage

        deal.save()

        create_activity_log(

            user=request.user,

            action_type=
            "DEAL_STAGE_CHANGED",

            description=
            f"Deal '{deal.deal_name}' moved to {new_stage}"
        )

        create_notification(

            user=request.user,

            title="Deal Stage Updated",

            message=
            f"Deal moved to {new_stage}"
        )

        return Response(
            {
                "message":
                f"Deal moved to {new_stage}"
            }
        )