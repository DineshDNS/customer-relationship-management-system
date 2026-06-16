from django.contrib import admin
from .models import Customer


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "email",
        "phone",
        "company",
        "lead_source",
        "created_by",
    )

    search_fields = (
        "name",
        "email",
        "company",
    )