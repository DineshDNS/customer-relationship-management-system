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

        fields = "__all__"

        read_only_fields = [
            "created_by",
        ]