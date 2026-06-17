from django.urls import path

from .views import (
    LeadListCreateView,
    LeadDetailView,
    LeadStatusUpdateView,
    LeadAssignView,
    MyLeadsView,
)

urlpatterns = [

    path(
        "",
        LeadListCreateView.as_view(),
        name="lead-list-create",
    ),

    path(
        "my-leads/",
        MyLeadsView.as_view(),
        name="my-leads",
    ),

    path(
        "<int:pk>/",
        LeadDetailView.as_view(),
        name="lead-detail",
    ),

    path(
        "<int:pk>/status/",
        LeadStatusUpdateView.as_view(),
        name="lead-status-update",
    ),

    path(
        "<int:pk>/assign/",
        LeadAssignView.as_view(),
        name="lead-assign",
    ),
]