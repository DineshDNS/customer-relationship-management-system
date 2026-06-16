from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ADMIN = "ADMIN"
    MANAGER = "MANAGER"
    SALES_EXECUTIVE = "SALES_EXECUTIVE"

    ROLE_CHOICES = [
        (ADMIN, "Admin"),
        (MANAGER, "Manager"),
        (SALES_EXECUTIVE, "Sales Executive"),
    ]

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default=SALES_EXECUTIVE
    )

    phone = models.CharField(
        max_length=15,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.username} ({self.role})"