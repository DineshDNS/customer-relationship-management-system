from .models import Notification


# ==============================
# Create Notification
# ==============================

def create_notification(
    user,
    title,
    message
):

    Notification.objects.create(
        user=user,
        title=title,
        message=message
    )