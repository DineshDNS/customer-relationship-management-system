from django.db.models import Sum
from django.db.models import Avg

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated
)

from customers.models import Customer
from leads.models import Lead
from deals.models import Deal

from django.db.models.functions import TruncMonth
from django.db.models import Sum


# ==============================
# Dashboard Statistics
# ==============================

class DashboardStatsView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(
        self,
        request
    ):

        # ==============================
        # Customer Metrics
        # ==============================

        total_customers = (
            Customer.objects.count()
        )

        # ==============================
        # Lead Metrics
        # ==============================

        total_leads = (
            Lead.objects.count()
        )

        new_leads = (
            Lead.objects.filter(
                status="NEW"
            ).count()
        )

        qualified_leads = (
            Lead.objects.filter(
                status="QUALIFIED"
            ).count()
        )

        converted_leads = (
            Lead.objects.filter(
                status="CONVERTED"
            ).count()
        )

        # ==============================
        # Deal Metrics
        # ==============================

        total_deals = (
            Deal.objects.count()
        )

        won_deals = (
            Deal.objects.filter(
                stage="WON"
            ).count()
        )

        lost_deals = (
            Deal.objects.filter(
                stage="LOST"
            ).count()
        )

        active_deals = (
            Deal.objects.exclude(
                stage__in=[
                    "WON",
                    "LOST"
                ]
            ).count()
        )

        # ==============================
        # Revenue Metrics
        # ==============================

        total_revenue = (
            Deal.objects.filter(
                stage="WON"
            ).aggregate(
                Sum("deal_value")
            )["deal_value__sum"]
            or 0
        )

        average_deal_value = (
            Deal.objects.aggregate(
                Avg("deal_value")
            )["deal_value__avg"]
            or 0
        )

        # ==============================
        # KPI Metrics
        # ==============================

        lead_conversion_rate = 0

        if total_leads > 0:
            lead_conversion_rate = round(
                (
                    converted_leads
                    / total_leads
                ) * 100,
                2
            )

        deal_win_rate = 0

        if total_deals > 0:
            deal_win_rate = round(
                (
                    won_deals
                    / total_deals
                ) * 100,
                2
            )

        # ==============================
        # Response
        # ==============================

        return Response({

            # Customers
            "total_customers":
                total_customers,

            # Leads
            "total_leads":
                total_leads,

            "new_leads":
                new_leads,

            "qualified_leads":
                qualified_leads,

            "converted_leads":
                converted_leads,

            # Deals
            "total_deals":
                total_deals,

            "won_deals":
                won_deals,

            "lost_deals":
                lost_deals,

            "active_deals":
                active_deals,

            # Revenue
            "total_revenue":
                total_revenue,

            "average_deal_value":
                average_deal_value,

            # KPIs
            "lead_conversion_rate":
                lead_conversion_rate,

            "deal_win_rate":
                deal_win_rate,
        })
    
# ==============================
# Sales Funnel Analytics
# ==============================

class DashboardFunnelView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(
        self,
        request
    ):

        new_leads = (
            Lead.objects.filter(
                status="NEW"
            ).count()
        )

        contacted_leads = (
            Lead.objects.filter(
                status="CONTACTED"
            ).count()
        )

        qualified_leads = (
            Lead.objects.filter(
                status="QUALIFIED"
            ).count()
        )

        converted_leads = (
            Lead.objects.filter(
                status="CONVERTED"
            ).count()
        )

        closed_leads = (
            Lead.objects.filter(
                status="CLOSED"
            ).count()
        )

        return Response({

            "new":
                new_leads,

            "contacted":
                contacted_leads,

            "qualified":
                qualified_leads,

            "converted":
                converted_leads,

            "closed":
                closed_leads,
        })
    
# ==============================
# Monthly Revenue Analytics
# ==============================

class DashboardRevenueView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(
        self,
        request
    ):

        revenue_data = (
            Deal.objects.filter(
                stage="WON"
            )
            .annotate(
                month=TruncMonth(
                    "created_at"
                )
            )
            .values(
                "month"
            )
            .annotate(
                revenue=Sum(
                    "deal_value"
                )
            )
            .order_by(
                "month"
            )
        )

        response_data = []

        for item in revenue_data:

            response_data.append({

                "month":
                    item["month"].strftime(
                        "%b %Y"
                    ),

                "revenue":
                    item["revenue"]
            })

        return Response(
            response_data
        )