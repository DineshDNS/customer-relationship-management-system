from rest_framework import serializers

from .models import Communication


class CommunicationSerializer(
    serializers.ModelSerializer
):

    customer_name = serializers.CharField(
        source="customer.name",
        read_only=True
    )

    created_by_name = serializers.CharField(
        source="created_by.username",
        read_only=True
    )

    class Meta:

        model = Communication

        fields = [

            "id",

            "customer",
            "customer_name",

            "communication_type",

            "subject",

            "description",

            "created_by",
            "created_by_name",

            "created_at",
            "updated_at",
        ]

        read_only_fields = [

            "created_by",

            "created_at",

            "updated_at",
        ]