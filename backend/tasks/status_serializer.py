from rest_framework import serializers


class TaskStatusSerializer(
    serializers.Serializer
):

    status = serializers.CharField()