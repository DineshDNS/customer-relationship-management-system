from rest_framework import serializers


class LeadStatusSerializer(
    serializers.Serializer
):

    status = serializers.CharField()