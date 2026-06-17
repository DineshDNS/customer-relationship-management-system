from django.db import models
from django.conf import settings

from leads.models import Lead


class Deal(models.Model):

    STAGE_CHOICES = [
        ("PROSPECTING", "Prospecting"),
        ("PROPOSAL", "Proposal"),
        ("NEGOTIATION", "Negotiation"),
        ("WON", "Won"),
        ("LOST", "Lost"),
    ]

    lead = models.ForeignKey(
        Lead,
        on_delete=models.CASCADE,
        related_name="deals"
    )

    deal_name = models.CharField(
        max_length=255
    )

    deal_value = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    stage = models.CharField(
        max_length=20,
        choices=STAGE_CHOICES,
        default="PROSPECTING"
    )

    expected_close_date = models.DateField()

    notes = models.TextField(
        blank=True,
        null=True
    )

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="created_deals"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.deal_name