# ==============================
# Task Status Workflow
# ==============================

VALID_TRANSITIONS = {

    "PENDING": [
        "IN_PROGRESS"
    ],

    "IN_PROGRESS": [
        "COMPLETED"
    ],

    "COMPLETED": [],
}


def validate_task_transition(
    current_status,
    new_status
):

    return (
        new_status
        in VALID_TRANSITIONS[
            current_status
        ]
    )