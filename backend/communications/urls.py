from django.urls import path

from .views import (

    CommunicationListCreateView,

    CommunicationDetailView,

    CustomerCommunicationHistoryView,
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

    path(
        "customer/<int:customer_id>/",
        CustomerCommunicationHistoryView.as_view(),
        name="customer-communication-history",
    ),
]