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

class UserListView(
    generics.ListAPIView
):

    queryset = User.objects.all()

    serializer_class = UserSerializer

    permission_classes = [
        IsAuthenticated
    ]

class UserDetailView(
    generics.RetrieveAPIView
):

    queryset = User.objects.all()

    serializer_class = UserSerializer

    permission_classes = [
        IsAuthenticated
    ]