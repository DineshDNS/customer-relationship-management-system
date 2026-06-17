from rest_framework import generics

from rest_framework.permissions import (
    IsAuthenticated
)

from .models import ActivityLog

from .serializers import (
    ActivityLogSerializer
)


# ==============================
# Activity Timeline
# ==============================

class ActivityLogListView(
    generics.ListAPIView
):

    queryset = (
        ActivityLog.objects.all()
        .order_by("-created_at")
    )

    serializer_class = (
        ActivityLogSerializer
    )

    permission_classes = [
        IsAuthenticated
    ]