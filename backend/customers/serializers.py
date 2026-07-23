from rest_framework import serializers
from .models import Customer


class CustomerSerializer(serializers.ModelSerializer):

    created_by = serializers.StringRelatedField(
        read_only=True
    )

    created_by_id = serializers.IntegerField(
        source="created_by.id",
        read_only=True
    )

    created_by_username = serializers.CharField(
        source="created_by.username",
        read_only=True
    )

    class Meta:

        model = Customer

        fields = [

            "id",

            "name",

            "email",

            "phone",

            "company",

            "address",

            "lead_source",

            "created_by",

            "created_by_id",

            "created_by_username",

            "created_at",

            "updated_at",

        ]

        read_only_fields = [

            "id",

            "created_by",

            "created_by_id",

            "created_by_username",

            "created_at",

            "updated_at",

        ]