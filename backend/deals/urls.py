from django.urls import path

from .views import (
    DealListCreateView,
    DealDetailView,
    DealStageUpdateView,
)

urlpatterns = [

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
    path(
        "<int:pk>/stage/",
        DealStageUpdateView.as_view(),
        name="deal-stage-update",
    ),

]