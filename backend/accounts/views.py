from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer
from .permissions import (
    IsAdmin,
    IsAdminOrManager,
)

from rest_framework import generics

from .models import User

from .serializers import (
    UserSerializer,
    RegisterSerializer,
)

# ==============================
# Register
# ==============================

class RegisterView(
    generics.CreateAPIView
):

    queryset = User.objects.all()

    serializer_class = (
        RegisterSerializer
    )

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class AdminDashboardView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        return Response({
            "message": "Welcome Admin"
        })


class ManagementView(APIView):
    permission_classes = [IsAdminOrManager]

    def get(self, request):
        return Response({
            "message": "Manager/Admin Access Granted"
        })
    
# ==============================
# Users List
# ==============================

from django.db.models import Q


class UserListView(
    generics.ListAPIView
):

    serializer_class = UserSerializer

    permission_classes = [
        IsAuthenticated
    ]

    pagination_class = None

    def get_queryset(self):

        user = self.request.user

        # Admin
        if user.role == "ADMIN":

            return User.objects.filter(

                Q(role="MANAGER") |

                Q(role="SALES_EXECUTIVE")

            ).order_by("username")

        # Manager
        if user.role == "MANAGER":

            return User.objects.filter(

                role="SALES_EXECUTIVE"

            ).order_by("username")

        # Sales Executive
        return User.objects.filter(
            id=user.id
        )

class UserDetailView(
    generics.RetrieveAPIView
):

    queryset = User.objects.all()

    serializer_class = UserSerializer

    permission_classes = [
        IsAuthenticated
    ]

# ==============================
# Users for Lead Assignment
# ==============================

class AssignUserListView(
    generics.ListAPIView
):

    serializer_class = UserSerializer

    permission_classes = [
        IsAuthenticated
    ]

    pagination_class = None

    def get_queryset(self):

        user = self.request.user

        # Admin & Manager can assign only Sales Executives

        if user.role in [
            "ADMIN",
            "MANAGER",
        ]:

            return User.objects.filter(
                role="SALES_EXECUTIVE"
            ).order_by(
                "username"
            )

        return User.objects.none()