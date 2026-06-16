from rest_framework import serializers
from .models import Customer


class CustomerSerializer(serializers.ModelSerializer):

    created_by = serializers.StringRelatedField(read_only=True)

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
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_by",
            "created_at",
            "updated_at",
        ]