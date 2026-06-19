from django.urls import path

from .views import (
    DashboardStatsView,
    DashboardFunnelView,
    DashboardRevenueView,
    LeadChartView,
    TaskChartView,
    RevenueChartView,
    DealChartView,

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

    path(
        "lead-chart/",
        LeadChartView.as_view(),
        name="lead-chart",
    ),

    path(
        "deal-chart/",
        DealChartView.as_view(),
        name="deal-chart",
    ),

    path(
        "task-chart/",
        TaskChartView.as_view(),
        name="task-chart",
    ),

    path(
        "revenue-chart/",
        RevenueChartView.as_view(),
        name="revenue-chart",
    ),

]