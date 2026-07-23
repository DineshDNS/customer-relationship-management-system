from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .helpers import (
    get_dashboard_stats,
    get_lead_chart,
    get_deal_chart,
    get_recent_customers,
    get_recent_leads,
    get_recent_tasks,
    get_recent_deals,
)


# ==========================================
# Dashboard Statistics
# ==========================================

class DashboardStatsView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        return Response(
            get_dashboard_stats(
                request.user
            )
        )


# ==========================================
# Lead Chart
# ==========================================

class LeadChartView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        return Response(
            get_lead_chart(
                request.user
            )
        )


# ==========================================
# Deal Chart
# ==========================================

class DealChartView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        return Response(
            get_deal_chart(
                request.user
            )
        )


# ==========================================
# Recent Customers
# ==========================================

class RecentCustomersView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        customers = get_recent_customers(
            request.user
        )

        data = []

        for customer in customers:

            data.append({

                "id":
                    customer.id,

                "name":
                    customer.name,

                "company":
                    customer.company,

                "email":
                    customer.email,

            })

        return Response(data)


# ==========================================
# Recent Leads
# ==========================================

class RecentLeadsView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        leads = get_recent_leads(
            request.user
        )

        data = []

        for lead in leads:

            data.append({

                "id":
                    lead.id,

                "customer":
                    lead.customer.name,

                "status":
                    lead.status,

                "priority":
                    lead.priority,

                "assigned_to":
                    lead.assigned_to.username,

            })

        return Response(data)


# ==========================================
# Recent Tasks
# ==========================================

class RecentTasksView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        tasks = get_recent_tasks(
            request.user
        )

        data = []

        for task in tasks:

            data.append({

                "id":
                    task.id,

                "title":
                    task.title,

                "customer":
                    task.customer.name,

                "status":
                    task.status,

                "due_date":
                    task.due_date,

            })

        return Response(data)


# ==========================================
# Recent Deals
# ==========================================

class RecentDealsView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        deals = get_recent_deals(
            request.user
        )

        data = []

        for deal in deals:

            data.append({

                "id":
                    deal.id,

                "deal_name":
                    deal.deal_name,

                "customer":
                    deal.lead.customer.name,

                "stage":
                    deal.stage,

                "deal_value":
                    deal.deal_value,

            })

        return Response(data)