from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "role",
            "phone",
        ]

from rest_framework import serializers

from .models import User


# ==============================
# User Profile Serializer
# ==============================

class UserSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = User

        fields = [
            "id",
            "username",
            "email",
            "role",
            "phone",
        ]


# ==============================
# User Registration Serializer
# ==============================

class RegisterSerializer(
    serializers.ModelSerializer
):

    password = serializers.CharField(
        write_only=True
    )

    confirm_password = serializers.CharField(
        write_only=True
    )

    class Meta:

        model = User

        fields = [
            "first_name",
            "username",
            "email",
            "phone",
            "password",
            "confirm_password",
            "role",
        ]

    def validate(
        self,
        attrs
    ):

        if (
            attrs["password"]
            != attrs["confirm_password"]
        ):
            raise serializers.ValidationError(
                {
                    "password":
                    "Passwords do not match."
                }
            )

        return attrs

    def create(
        self,
        validated_data
    ):

        validated_data.pop(
            "confirm_password"
        )

        user = User.objects.create_user(

            username=validated_data[
                "username"
            ],

            email=validated_data[
                "email"
            ],

            first_name=validated_data[
                "first_name"
            ],

            phone=validated_data[
                "phone"
            ],

            role=validated_data[
                "role"
            ],

            password=validated_data[
                "password"
            ],
        )

        return user