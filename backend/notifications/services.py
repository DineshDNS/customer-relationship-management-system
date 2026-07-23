from .models import Notification


# =====================================
# Create Notification
# =====================================

def create_notification(
    user,
    title,
    message,
    notification_type="SYSTEM"
):

    return Notification.objects.create(

        user=user,

        notification_type=notification_type,

        title=title,

        message=message,

    )