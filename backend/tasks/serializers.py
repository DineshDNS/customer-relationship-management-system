from rest_framework import serializers

from .models import Task


class TaskSerializer(
    serializers.ModelSerializer
):

    customer_name = serializers.CharField(
        source="customer.name",
        read_only=True
    )

    assigned_to_name = serializers.CharField(
        source="assigned_to.username",
        read_only=True
    )

    created_by_name = serializers.CharField(
        source="created_by.username",
        read_only=True
    )

    class Meta:

        model = Task

        fields = [
            "id",
            "title",
            "description",

            "customer",
            "customer_name",

            "assigned_to",
            "assigned_to_name",

            "created_by",
            "created_by_name",

            "task_type",
            "status",

            "due_date",

            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_by",
            "created_at",
            "updated_at",
        ]