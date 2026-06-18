from rest_framework import generics

from rest_framework.permissions import (
    IsAuthenticated
)

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Notification
from .serializers import (
    NotificationSerializer
)
from django.shortcuts import get_object_or_404


# ==============================
# Notification List
# ==============================

class NotificationListView(
    generics.ListAPIView
):

    serializer_class = (
        NotificationSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(
        self
    ):

        return Notification.objects.filter(
            user=self.request.user
        ).order_by(
            "-created_at"
        )


# ==============================
# Mark As Read
# ==============================

class NotificationReadView(
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

        notification = get_object_or_404(
            Notification,
            pk=pk,
            user=request.user
        )

        notification.is_read = True

        notification.save()

        return Response(
            {
                "message":
                "Notification marked as read"
            }
        )
    
