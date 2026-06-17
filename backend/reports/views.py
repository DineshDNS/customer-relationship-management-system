from django.db.models import Sum

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated
)

from leads.models import Lead
from deals.models import Deal
from activities.models import ActivityLog


# ==============================
# Sales Performance Report
# ==============================

class SalesPerformanceReportView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(
        self,
        request
    ):

        total_deals = (
            Deal.objects.count()
        )

        won_deals = (
            Deal.objects.filter(
                stage="WON"
            ).count()
        )

        revenue = (
            Deal.objects.filter(
                stage="WON"
            ).aggregate(
                Sum("deal_value")
            )["deal_value__sum"]
            or 0
        )

        return Response({

            "total_deals":
                total_deals,

            "won_deals":
                won_deals,

            "total_revenue":
                revenue,
        })


# ==============================
# Lead Conversion Report
# ==============================

class LeadConversionReportView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(
        self,
        request
    ):

        total_leads = (
            Lead.objects.count()
        )

        converted_leads = (
            Lead.objects.filter(
                status="CONVERTED"
            ).count()
        )

        conversion_rate = 0

        if total_leads > 0:

            conversion_rate = round(

                (
                    converted_leads
                    / total_leads
                ) * 100,

                2
            )

        return Response({

            "total_leads":
                total_leads,

            "converted_leads":
                converted_leads,

            "conversion_rate":
                conversion_rate,
        })


# ==============================
# User Activity Report
# ==============================

class UserActivityReportView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(
        self,
        request
    ):

        activities = (
            ActivityLog.objects
            .all()
            .order_by(
                "-created_at"
            )[:50]
        )

        data = []

        for activity in activities:

            data.append({

                "user":
                    activity.user.username,

                "action":
                    activity.action_type,

                "description":
                    activity.description,

                "date":
                    activity.created_at,
            })

        return Response(data)