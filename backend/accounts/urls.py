from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    ProfileView,
    AdminDashboardView,
    ManagementView,
)

urlpatterns = [
    path(
        "login/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),

    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),

    path(
        "profile/",
        ProfileView.as_view(),
        name="profile",
    ),

    path(
        "admin-dashboard/",
        AdminDashboardView.as_view(),
        name="admin_dashboard",
    ),

    path(
        "management/",
        ManagementView.as_view(),
        name="management",
    ),
]