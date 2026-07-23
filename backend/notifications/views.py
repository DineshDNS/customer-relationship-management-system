from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Notification
from .serializers import NotificationSerializer


# =====================================
# Notification List
# =====================================

class NotificationListView(
    generics.ListAPIView
):

    serializer_class = NotificationSerializer

    permission_classes = [
        IsAuthenticated
    ]

    filter_backends = [
        filters.SearchFilter
    ]

    search_fields = [
        "title",
        "message",
    ]

    def get_queryset(
        self
    ):

        queryset = Notification.objects.filter(
            user=self.request.user
        )

        status = self.request.query_params.get(
            "status"
        )

        if status == "read":

            queryset = queryset.filter(
                is_read=True
            )

        elif status == "unread":

            queryset = queryset.filter(
                is_read=False
            )

        return queryset.order_by(
            "-created_at"
        )


# =====================================
# Mark Notification Read
# =====================================

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

            user=request.user,

        )

        notification.is_read = True

        notification.save()

        return Response({

            "message":
            "Notification marked as read."

        })


# =====================================
# Mark All Read
# =====================================

class NotificationReadAllView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def patch(
        self,
        request
    ):

        Notification.objects.filter(

            user=request.user,

            is_read=False,

        ).update(

            is_read=True

        )

        return Response({

            "message":
            "All notifications marked as read."

        })


# =====================================
# Delete Notification
# =====================================

class NotificationDeleteView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def delete(
        self,
        request,
        pk
    ):

        notification = get_object_or_404(

            Notification,

            pk=pk,

            user=request.user,

        )

        notification.delete()

        return Response({

            "message":
            "Notification deleted."

        })


# =====================================
# Unread Count
# =====================================

class NotificationUnreadCountView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(
        self,
        request
    ):

        unread = Notification.objects.filter(

            user=request.user,

            is_read=False,

        ).count()

        return Response({

            "unread_count":
            unread

        })