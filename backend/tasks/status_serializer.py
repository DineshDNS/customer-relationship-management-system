from rest_framework import serializers


class TaskStatusSerializer(
    serializers.Serializer
):

    status = serializers.ChoiceField(

        choices=[

            "PENDING",

            "IN_PROGRESS",

            "COMPLETED",

        ]

    )