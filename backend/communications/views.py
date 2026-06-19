from rest_framework import generics
from rest_framework.permissions import (
    IsAuthenticated
)

from .models import Communication
from .serializers import (
    CommunicationSerializer
)


class CommunicationListCreateView(
    generics.ListCreateAPIView
):

    queryset = Communication.objects.all().order_by(
        "-created_at"
    )

    serializer_class = (
        CommunicationSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]

    def perform_create(
        self,
        serializer
    ):

        serializer.save(
            created_by=self.request.user
        )


class CommunicationDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Communication.objects.all()

    serializer_class = (
        CommunicationSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]