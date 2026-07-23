# =====================================
# Deal Stage Transition Rules
# =====================================

VALID_STAGE_TRANSITIONS = {

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

    "WON": [

    ],

    "LOST": [

    ],

}


# =====================================
# Validate Stage Transition
# =====================================

def validate_stage_transition(
    current_stage,
    new_stage,
):
    """
    Validate whether a deal
    can move to the requested stage.
    """

    return new_stage in VALID_STAGE_TRANSITIONS.get(
        current_stage,
        [],
    )


# =====================================
# Get Next Available Stages
# =====================================

def get_next_stages(
    current_stage,
):
    """
    Returns the list of valid
    next stages.
    """

    return VALID_STAGE_TRANSITIONS.get(
        current_stage,
        [],
    )


# =====================================
# Check if Deal Closed
# =====================================

def is_deal_closed(
    stage,
):

    return stage in [

        "WON",

        "LOST",

    ]


# =====================================
# Check if Deal Won
# =====================================

def is_deal_won(
    stage,
):

    return stage == "WON"


# =====================================
# Check if Deal Lost
# =====================================

def is_deal_lost(
    stage,
):

    return stage == "LOST"