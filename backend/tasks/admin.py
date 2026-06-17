from django.contrib import admin
from .models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "title",
        "task_type",
        "status",
        "assigned_to",
        "due_date",
    )

    list_filter = (
        "task_type",
        "status",
    )

    search_fields = (
        "title",
    )