from django.contrib import admin
from .models import Deal


@admin.register(Deal)
class DealAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "deal_name",
        "deal_value",
        "stage",
        "expected_close_date",
        "created_by",
    )

    list_filter = (
        "stage",
    )

    search_fields = (
        "deal_name",
    )