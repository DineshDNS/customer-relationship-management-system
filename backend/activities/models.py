from django.db import models
from django.conf import settings


class ActivityLog(models.Model):

    ACTION_TYPES = [

        ("CUSTOMER_CREATED",
         "Customer Created"),

        ("LEAD_CREATED",
         "Lead Created"),

        ("LEAD_ASSIGNED",
         "Lead Assigned"),

        ("LEAD_STATUS_CHANGED",
         "Lead Status Changed"),

        ("DEAL_CREATED",
         "Deal Created"),

        ("DEAL_STAGE_CHANGED",
         "Deal Stage Changed"),

        ("TASK_CREATED",
         "Task Created"),

        ("TASK_COMPLETED",
         "Task Completed"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    action_type = models.CharField(
        max_length=50,
        choices=ACTION_TYPES
    )

    description = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return (
            f"{self.user.username}"
            f" - "
            f"{self.action_type}"
        )