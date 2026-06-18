from django.urls import path

from .views import (

    SalesPerformanceReportView,

    LeadConversionReportView,

    UserActivityReportView,
)

from .views import (
    DashboardReportView,
    SalesPerformanceReportView,
    LeadConversionReportView,
    UserActivityReportView,
)
urlpatterns = [

    path(
        "sales/",
        SalesPerformanceReportView.as_view(),
        name="sales-report",
    ),

    path(
        "leads/",
        LeadConversionReportView.as_view(),
        name="lead-report",
    ),

    path(
        "activities/",
        UserActivityReportView.as_view(),
        name="activity-report",
    ),

    path(
        "dashboard/",
        DashboardReportView.as_view(),
        name="dashboard-report",
    ),

]