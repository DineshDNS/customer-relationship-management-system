from django.db.models import (
    Sum,
    Count,
)

from customers.models import Customer
from leads.models import Lead
from deals.models import Deal
from tasks.models import Task


# ==========================================
# Customer QuerySet
# ==========================================

def get_customer_queryset(user):

    if user.role == "ADMIN":

        return Customer.objects.all()

    return Customer.objects.filter(
        created_by=user
    )


# ==========================================
# Lead QuerySet
# ==========================================

def get_lead_queryset(user):

    if user.role == "ADMIN":

        return Lead.objects.all()

    return Lead.objects.filter(
        assigned_to=user
    )


# ==========================================
# Deal QuerySet
# ==========================================

def get_deal_queryset(user):

    if user.role == "ADMIN":

        return Deal.objects.all()

    return Deal.objects.filter(
        lead__assigned_to=user
    )


# ==========================================
# Task QuerySet
# ==========================================

def get_task_queryset(user):

    if user.role == "ADMIN":

        return Task.objects.all()

    return Task.objects.filter(
        assigned_to=user
    )


# ==========================================
# Dashboard Statistics
# ==========================================

def get_dashboard_stats(user):

    customers = get_customer_queryset(user)

    leads = get_lead_queryset(user)

    deals = get_deal_queryset(user)

    tasks = get_task_queryset(user)

    revenue = (

        deals.filter(
            stage="WON"
        )

        .aggregate(
            total=Sum("deal_value")
        )["total"]

        or 0

    )

    return {

        "total_customers":
            customers.count(),

        "total_leads":
            leads.count(),

        "total_deals":
            deals.count(),

        "total_tasks":
            tasks.count(),

        "total_revenue":
            revenue,

    }


# ==========================================
# Lead Status Chart
# ==========================================

def get_lead_chart(user):

    return list(

        get_lead_queryset(user)

        .values("status")

        .annotate(
            count=Count("id")
        )

        .order_by("status")

    )


# ==========================================
# Deal Stage Chart
# ==========================================

def get_deal_chart(user):

    return list(

        get_deal_queryset(user)

        .values("stage")

        .annotate(
            count=Count("id")
        )

        .order_by("stage")

    )


# ==========================================
# Recent Customers
# ==========================================

def get_recent_customers(user):

    return (

        get_customer_queryset(user)

        .order_by("-created_at")[:5]

    )


# ==========================================
# Recent Leads
# ==========================================

def get_recent_leads(user):

    return (

        get_lead_queryset(user)

        .select_related(
            "customer",
            "assigned_to"
        )

        .order_by("-created_at")[:5]

    )


# ==========================================
# Recent Tasks
# ==========================================

def get_recent_tasks(user):

    return (

        get_task_queryset(user)

        .select_related(
            "customer",
            "assigned_to"
        )

        .order_by("-created_at")[:5]

    )


# ==========================================
# Recent Deals
# ==========================================

def get_recent_deals(user):

    return (

        get_deal_queryset(user)

        .select_related(
            "lead",
            "lead__customer"
        )

        .order_by("-created_at")[:5]

    )