from django.db import models
from django.conf import settings


class Customer(models.Model):

    LEAD_SOURCES = [
        ("Website", "Website"),
        ("Referral", "Referral"),
        ("Social Media", "Social Media"),
        ("Cold Call", "Cold Call"),
        ("Other", "Other"),
    ]

    name = models.CharField(max_length=255)

    email = models.EmailField(unique=True)

    phone = models.CharField(max_length=15)

    company = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    address = models.TextField(
        blank=True,
        null=True
    )

    lead_source = models.CharField(
        max_length=50,
        choices=LEAD_SOURCES,
        default="Other"
    )

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="customers"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.name