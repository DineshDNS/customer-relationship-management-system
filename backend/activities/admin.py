from django.contrib import admin

from .models import ActivityLog


@admin.register(ActivityLog)
class ActivityLogAdmin(
    admin.ModelAdmin
):

    list_display = (
        "id",
        "user",
        "action_type",
        "created_at",
    )

    list_filter = (
        "action_type",
    )