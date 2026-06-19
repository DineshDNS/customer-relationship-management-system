from rest_framework import generics
from rest_framework import filters

from rest_framework.permissions import (
    IsAuthenticated
)

from .models import Communication

from .serializers import (
    CommunicationSerializer
)

from activities.services import (
    create_activity_log
)

from notifications.services import (
    create_notification
)


# ==============================
# Communication List & Create
# ==============================

class CommunicationListCreateView(
    generics.ListCreateAPIView
):

    queryset = (
        Communication.objects.all()
        .order_by("-created_at")
    )

    serializer_class = (
        CommunicationSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]

    filter_backends = [
        filters.SearchFilter
    ]

    search_fields = [
        "subject",
        "description",
        "communication_type",
        "customer__name",
    ]

    def perform_create(
        self,
        serializer
    ):

        communication = serializer.save(
            created_by=self.request.user
        )

        create_activity_log(

            user=self.request.user,

            action_type=
            "TASK_CREATED",

            description=
            f"{communication.communication_type} added for "
            f"{communication.customer.name}"
        )

        create_notification(

            user=self.request.user,

            title="Communication Added",

            message=
            f"{communication.communication_type} "
            f"added for "
            f"{communication.customer.name}"
        )


# ==============================
# Communication Detail
# ==============================

class CommunicationDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = (
        Communication.objects.all()
    )

    serializer_class = (
        CommunicationSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]


# ==============================
# Customer Communication History
# ==============================

class CustomerCommunicationHistoryView(
    generics.ListAPIView
):

    serializer_class = (
        CommunicationSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(
        self
    ):

        customer_id = (
            self.kwargs["customer_id"]
        )

        return Communication.objects.filter(
            customer_id=customer_id
        ).order_by(
            "-created_at"
        )