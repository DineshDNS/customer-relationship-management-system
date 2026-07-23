from rest_framework import serializers

from .models import Deal


class DealSerializer(serializers.ModelSerializer):

    lead_customer = serializers.CharField(
        source="lead.customer.name",
        read_only=True,
    )

    created_by_name = serializers.CharField(
        source="created_by.username",
        read_only=True,
    )

    assigned_to_name = serializers.CharField(
        source="assigned_to.username",
        read_only=True,
    )

    class Meta:

        model = Deal

        fields = [

            "id",

            "lead",

            "lead_customer",

            "deal_name",

            "deal_value",

            "stage",

            "expected_close_date",

            "notes",

            "assigned_to",

            "assigned_to_name",

            "created_by",

            "created_by_name",

            "created_at",

            "updated_at",

        ]

        read_only_fields = [

            "id",

            "created_by",

            "created_by_name",

            "assigned_to_name",

            "lead_customer",

            "created_at",

            "updated_at",

        ]