from django.urls import path

from .views import (

    DashboardReportView,

    SalesPerformanceReportView,

    LeadConversionReportView,

    UserActivityReportView,

    ExportSalesReportPDFView,
    ExportSalesReportExcelView,

    ExportLeadReportPDFView,
    ExportLeadReportExcelView,

    ExportActivityReportPDFView,
    ExportActivityReportExcelView,
)

urlpatterns = [

    # =====================================
    # Dashboard Report
    # =====================================

    path(
        "dashboard/",
        DashboardReportView.as_view(),
        name="dashboard-report",
    ),

    # =====================================
    # API Reports
    # =====================================

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

    # =====================================
    # Sales Export
    # =====================================

    path(
        "sales/pdf/",
        ExportSalesReportPDFView.as_view(),
        name="sales-pdf",
    ),

    path(
        "sales/excel/",
        ExportSalesReportExcelView.as_view(),
        name="sales-excel",
    ),

    # =====================================
    # Lead Export
    # =====================================

    path(
        "leads/pdf/",
        ExportLeadReportPDFView.as_view(),
        name="lead-pdf",
    ),

    path(
        "leads/excel/",
        ExportLeadReportExcelView.as_view(),
        name="lead-excel",
    ),

    # =====================================
    # Activity Export
    # =====================================

    path(
        "activities/pdf/",
        ExportActivityReportPDFView.as_view(),
        name="activity-pdf",
    ),

    path(
        "activities/excel/",
        ExportActivityReportExcelView.as_view(),
        name="activity-excel",
    ),
]