from django.contrib import admin
from .models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "customer",
        "assigned_to",
        "status",
        "priority",
        "created_by",
        "created_at",
    )

    list_filter = (
        "status",
        "priority",
    )

    search_fields = (
        "customer__name",
        "assigned_to__username",
    )