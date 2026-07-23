from django.urls import path

from .views import (
    DealListCreateView,
    DealDetailView,
    DealAssignView,
    DealStageUpdateView,
)

urlpatterns = [

    # ==========================
    # Deals
    # ==========================

    path(
        "",
        DealListCreateView.as_view(),
        name="deal-list-create",
    ),

    path(
        "<int:pk>/",
        DealDetailView.as_view(),
        name="deal-detail",
    ),

    # ==========================
    # Assign Deal
    # ==========================

    path(
        "<int:pk>/assign/",
        DealAssignView.as_view(),
        name="deal-assign",
    ),

    # ==========================
    # Update Stage
    # ==========================

    path(
        "<int:pk>/stage/",
        DealStageUpdateView.as_view(),
        name="deal-stage-update",
    ),

]