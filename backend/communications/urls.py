from django.urls import path

from .views import (
    CommunicationListCreateView,
    CommunicationDetailView,
)

urlpatterns = [

    path(
        "",
        CommunicationListCreateView.as_view(),
        name="communication-list-create",
    ),

    path(
        "<int:pk>/",
        CommunicationDetailView.as_view(),
        name="communication-detail",
    ),
]