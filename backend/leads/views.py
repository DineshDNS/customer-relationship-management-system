from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response

from accounts.models import User

from .models import Lead
from .serializers import LeadSerializer
from .permissions import IsLeadOwnerOrAdminOrManager
from .status_serializer import LeadStatusSerializer
from .services import validate_status_transition


# ==============================
# Lead List & Create
# ==============================

class LeadListCreateView(
    generics.ListCreateAPIView
):

    queryset = Lead.objects.all().order_by(
        "-created_at"
    )

    serializer_class = LeadSerializer

    permission_classes = [
        IsAuthenticated
    ]

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

    def perform_create(
        self,
        serializer
    ):
        serializer.save(
            created_by=self.request.user
        )


# ==============================
# Lead Detail
# Retrieve
# Update
# Delete
# ==============================

class LeadDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Lead.objects.all()

    serializer_class = LeadSerializer

    permission_classes = [
        IsAuthenticated,
        IsLeadOwnerOrAdminOrManager,
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
                "Sales Executives cannot delete leads."
            )

        instance.delete()


# ==============================
# Lead Status Update
# NEW
# CONTACTED
# QUALIFIED
# CONVERTED
# CLOSED
# ==============================

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

        lead = get_object_or_404(
            Lead,
            pk=pk
        )

        serializer = LeadStatusSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        new_status = (
            serializer.validated_data[
                "status"
            ]
        )

        if not validate_status_transition(
            lead.status,
            new_status
        ):
            return Response(
                {
                    "error":
                    "Invalid status transition"
                },
                status=400
            )

        lead.status = new_status

        lead.save()

        return Response(
            {
                "message":
                f"Lead moved to {new_status}"
            }
        )


# ==============================
# Lead Assignment
# Admin
# Manager
# ==============================

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

        lead = get_object_or_404(
            Lead,
            pk=pk
        )

        user_id = request.data.get(
            "assigned_to"
        )

        user = get_object_or_404(
            User,
            pk=user_id
        )

        lead.assigned_to = user

        lead.save()

        return Response(
            {
                "message":
                f"Lead assigned to {user.username}"
            }
        )


# ==============================
# My Leads
# Logged In User Leads
# ==============================

class MyLeadsView(
    generics.ListAPIView
):

    serializer_class = LeadSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(
        self
    ):
        return Lead.objects.filter(
            assigned_to=self.request.user
        ).order_by(
            "-created_at"
        )