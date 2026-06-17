from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    path(
        "api/auth/",
        include("accounts.urls"),
    ),

    path(
        "api/customers/",
        include("customers.urls"),
    ),

    path(
        "api/leads/",
        include("leads.urls"),
    ),

    path(
        "api/deals/",
        include("deals.urls"),
    ),

    path(
        "api/dashboard/",
        include("dashboard.urls"),
    ),

    path(
        "api/tasks/",
        include("tasks.urls"),
    ),

    path(
        "api/notifications/",
        include(
            "notifications.urls"
        ),
    ),

    path(
        "api/activities/",
        include(
            "activities.urls"
        ),
    ),

    path(
        "api/reports/",
        include("reports.urls"),
    ),
]