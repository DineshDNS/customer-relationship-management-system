# ==============================
# Deal Stage Workflow
# ==============================

VALID_TRANSITIONS = {

    "PROSPECTING": [
        "PROPOSAL",
        "LOST",
    ],

    "PROPOSAL": [
        "NEGOTIATION",
        "LOST",
    ],

    "NEGOTIATION": [
        "WON",
        "LOST",
    ],

    "WON": [],

    "LOST": [],
}


def validate_stage_transition(
    current_stage,
    new_stage
):

    return (
        new_stage
        in VALID_TRANSITIONS[
            current_stage
        ]
    )