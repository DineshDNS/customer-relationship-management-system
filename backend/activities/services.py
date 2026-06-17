from .models import ActivityLog


# ==============================
# Create Activity Log
# ==============================

def create_activity_log(
    user,
    action_type,
    description
):

    ActivityLog.objects.create(
        user=user,
        action_type=action_type,
        description=description
    )