VALID_TRANSITIONS = {
    "NEW": ["CONTACTED", "CLOSED"],
    "CONTACTED": ["QUALIFIED", "CLOSED"],
    "QUALIFIED": ["CONVERTED", "CLOSED"],
    "CONVERTED": [],
    "CLOSED": [],
}


def validate_status_transition(
    current_status,
    new_status
):
    return (
        new_status
        in VALID_TRANSITIONS[current_status]
    )