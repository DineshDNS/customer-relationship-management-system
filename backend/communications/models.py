from django.db import models
from django.conf import settings

from customers.models import Customer


class Communication(models.Model):

    COMMUNICATION_TYPES = [

        ("CALL", "Call"),

        ("EMAIL", "Email"),

        ("MEETING", "Meeting"),

        ("NOTE", "Note"),
    ]

    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name="communications"
    )

    communication_type = models.CharField(
        max_length=20,
        choices=COMMUNICATION_TYPES
    )

    subject = models.CharField(
        max_length=255
    )

    description = models.TextField()

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:

        ordering = [
            "-created_at"
        ]

    def __str__(self):

        return (

            f"{self.customer.name}"
            f" - "
            f"{self.communication_type}"
        )