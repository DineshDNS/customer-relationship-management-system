from django.urls import path

from .views import (
    DashboardStatsView,
    LeadChartView,
    DealChartView,
    RecentCustomersView,
    RecentLeadsView,
    RecentTasksView,
    RecentDealsView,
)

urlpatterns = [

    # ==========================================
    # Dashboard Statistics
    # ==========================================

    path(
        "stats/",
        DashboardStatsView.as_view(),
        name="dashboard-stats",
    ),

    # ==========================================
    # Dashboard Charts
    # ==========================================

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

    # ==========================================
    # Recent Data
    # ==========================================

    path(
        "recent-customers/",
        RecentCustomersView.as_view(),
        name="recent-customers",
    ),

    path(
        "recent-leads/",
        RecentLeadsView.as_view(),
        name="recent-leads",
    ),

    path(
        "recent-tasks/",
        RecentTasksView.as_view(),
        name="recent-tasks",
    ),

    path(
        "recent-deals/",
        RecentDealsView.as_view(),
        name="recent-deals",
    ),

]