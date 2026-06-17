from django.urls import path

from .views import (
    DashboardStatsView,
    DashboardFunnelView,
    DashboardRevenueView,
)

urlpatterns = [

    path(
        "stats/",
        DashboardStatsView.as_view(),
        name="dashboard-stats",
    ),

    path(
        "funnel/",
        DashboardFunnelView.as_view(),
        name="dashboard-funnel",
    ),

    path(
        "revenue/",
        DashboardRevenueView.as_view(),
        name="dashboard-revenue",
    ),

]