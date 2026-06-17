from rest_framework import serializers


class DealStageSerializer(
    serializers.Serializer
):

    stage = serializers.CharField()