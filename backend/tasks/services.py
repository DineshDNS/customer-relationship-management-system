# =====================================
# Task Status Transition Rules
# =====================================

VALID_TASK_TRANSITIONS = {

    "PENDING": [

        "IN_PROGRESS",

    ],

    "IN_PROGRESS": [

        "COMPLETED",

    ],

    "COMPLETED": [

    ],

}


# =====================================
# Validate Status Transition
# =====================================

def validate_task_transition(
    current_status,
    new_status,
):

    return new_status in VALID_TASK_TRANSITIONS.get(

        current_status,

        [],

    )


# =====================================
# Get Next Statuses
# =====================================

def get_next_statuses(
    current_status,
):

    return VALID_TASK_TRANSITIONS.get(

        current_status,

        [],

    )


# =====================================
# Check Completed
# =====================================

def is_completed(
    status,
):

    return status == "COMPLETED"