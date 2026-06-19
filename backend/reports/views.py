from django.db.models import Sum

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated
)

from leads.models import Lead
from deals.models import Deal
from activities.models import ActivityLog

from django.http import HttpResponse

import pandas as pd

from reportlab.platypus import (
    SimpleDocTemplate,
    Table,
    TableStyle,
    Paragraph,
    Spacer
)

from reportlab.lib import colors

from reportlab.lib.styles import (
    getSampleStyleSheet
)

from django.http import HttpResponse

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)

from reportlab.lib import colors
from reportlab.lib.units import inch

from datetime import datetime

import pandas as pd


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
    
from customers.models import Customer
from tasks.models import Task

# ==============================
# Dashboard Summary Report
# ==============================

class DashboardReportView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(
        self,
        request
    ):

        total_customers = (
            Customer.objects.count()
        )

        total_leads = (
            Lead.objects.count()
        )

        total_deals = (
            Deal.objects.count()
        )

        total_tasks = (
            Task.objects.count()
        )

        won_revenue = (
            Deal.objects.filter(
                stage="WON"
            ).aggregate(
                Sum("deal_value")
            )["deal_value__sum"]
            or 0
        )

        return Response({

            "customers":
                total_customers,

            "leads":
                total_leads,

            "deals":
                total_deals,

            "tasks":
                total_tasks,

            "revenue":
                won_revenue,
        })
    
class ExportSalesReportPDFView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        response = HttpResponse(
            content_type="application/pdf"
        )

        response[
            "Content-Disposition"
        ] = (
            'attachment; filename="sales_report.pdf"'
        )

        doc = SimpleDocTemplate(
            response
        )

        styles = getSampleStyleSheet()

        elements = []

        total_deals = Deal.objects.count()

        won_deals = Deal.objects.filter(
            stage="WON"
        ).count()

        revenue = sum(
            deal.deal_value
            for deal in Deal.objects.filter(
                stage="WON"
            )
        )

        elements.append(
            Paragraph(
                "CRM Sales Report",
                styles["Title"]
            )
        )

        elements.append(
            Spacer(1, 0.3 * inch)
        )

        summary = f"""
        Total Deals : {total_deals}<br/>
        Won Deals : {won_deals}<br/>
        Revenue : ₹ {revenue}
        """

        elements.append(
            Paragraph(
                summary,
                styles["Normal"]
            )
        )

        elements.append(
            Spacer(1, 0.3 * inch)
        )

        table_data = [[

            "Deal Name",
            "Customer",
            "Stage",
            "Value",
        ]]

        for deal in Deal.objects.all():

            customer = (
                deal.lead.customer.name
                if deal.lead
                else "-"
            )

            table_data.append([

                deal.deal_name,

                customer,

                deal.stage,

                str(
                    deal.deal_value
                ),
            ])

        table = Table(table_data)

        table.setStyle(

            TableStyle([

                (
                    "BACKGROUND",
                    (0, 0),
                    (-1, 0),
                    colors.red
                ),

                (
                    "TEXTCOLOR",
                    (0, 0),
                    (-1, 0),
                    colors.white
                ),

                (
                    "GRID",
                    (0, 0),
                    (-1, -1),
                    1,
                    colors.black
                ),

                (
                    "ALIGN",
                    (0, 0),
                    (-1, -1),
                    "CENTER"
                ),
            ])
        )

        elements.append(table)

        elements.append(
            Spacer(1, 0.3 * inch)
        )

        elements.append(

            Paragraph(

                f"Generated on : {datetime.now().strftime('%d-%m-%Y')}",

                styles["Italic"]
            )
        )

        doc.build(elements)

        return response
    
class ExportLeadReportPDFView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        response = HttpResponse(
            content_type="application/pdf"
        )

        response[
            "Content-Disposition"
        ] = (
            'attachment; filename="lead_report.pdf"'
        )

        doc = SimpleDocTemplate(
            response
        )

        styles = getSampleStyleSheet()

        elements = []

        total = Lead.objects.count()

        converted = Lead.objects.filter(
            status="CONVERTED"
        ).count()

        rate = 0

        if total > 0:

            rate = round(
                (converted / total) * 100,
                2
            )

        elements.append(

            Paragraph(
                "CRM Lead Report",
                styles["Title"]
            )
        )

        elements.append(
            Spacer(1, 0.3 * inch)
        )

        summary = f"""
        Total Leads : {total}<br/>
        Converted Leads : {converted}<br/>
        Conversion Rate : {rate}%
        """

        elements.append(
            Paragraph(
                summary,
                styles["Normal"]
            )
        )

        elements.append(
            Spacer(1, 0.3 * inch)
        )

        table_data = [[

            "Customer",

            "Assigned To",

            "Status",

            "Priority",
        ]]

        for lead in Lead.objects.all():

            table_data.append([

                lead.customer.name,

                lead.assigned_to.username,

                lead.status,

                lead.priority,
            ])

        table = Table(table_data)

        table.setStyle(

            TableStyle([

                (
                    "BACKGROUND",
                    (0,0),
                    (-1,0),
                    colors.red
                ),

                (
                    "TEXTCOLOR",
                    (0,0),
                    (-1,0),
                    colors.white
                ),

                (
                    "GRID",
                    (0,0),
                    (-1,-1),
                    1,
                    colors.black
                ),

                (
                    "ALIGN",
                    (0,0),
                    (-1,-1),
                    "CENTER"
                ),
            ])
        )

        elements.append(table)

        elements.append(
            Spacer(1,0.3*inch)
        )

        elements.append(

            Paragraph(

                f"Generated on : {datetime.now().strftime('%d-%m-%Y')}",

                styles["Italic"]
            )
        )

        doc.build(elements)

        return response

class ExportActivityReportPDFView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        response = HttpResponse(
            content_type="application/pdf"
        )

        response[
            "Content-Disposition"
        ] = (
            'attachment; filename="activity_report.pdf"'
        )

        doc = SimpleDocTemplate(
            response
        )

        styles = getSampleStyleSheet()

        elements = []

        activities = ActivityLog.objects.all()

        elements.append(

            Paragraph(
                "CRM Activity Report",
                styles["Title"]
            )
        )

        elements.append(
            Spacer(1,0.3*inch)
        )

        summary = f"""
        Total Activities : {activities.count()}
        """

        elements.append(

            Paragraph(
                summary,
                styles["Normal"]
            )
        )

        elements.append(
            Spacer(1,0.3*inch)
        )

        table_data = [[

            "User",

            "Action",

            "Description",

            "Date",
        ]]

        for activity in activities:

            table_data.append([

                activity.user.username,

                activity.action_type,

                activity.description,

                activity.created_at.strftime(
                    "%d-%m-%Y"
                )
            ])

        table = Table(table_data)

        table.setStyle(

            TableStyle([

                (
                    "BACKGROUND",
                    (0,0),
                    (-1,0),
                    colors.red
                ),

                (
                    "TEXTCOLOR",
                    (0,0),
                    (-1,0),
                    colors.white
                ),

                (
                    "GRID",
                    (0,0),
                    (-1,-1),
                    1,
                    colors.black
                ),

                (
                    "ALIGN",
                    (0,0),
                    (-1,-1),
                    "CENTER"
                ),
            ])
        )

        elements.append(table)

        elements.append(
            Spacer(1,0.3*inch)
        )

        elements.append(

            Paragraph(

                f"Generated on : {datetime.now().strftime('%d-%m-%Y')}",

                styles["Italic"]
            )
        )

        doc.build(elements)

        return response
    
class ExportSalesReportExcelView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        response = HttpResponse(
            content_type=
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )

        response[
            "Content-Disposition"
        ] = (
            'attachment; filename="sales_report.xlsx"'
        )

        rows = []

        total_deals = (
            Deal.objects.count()
        )

        won_deals = (
            Deal.objects.filter(
                stage="WON"
            ).count()
        )

        revenue = sum(
            deal.deal_value
            for deal in Deal.objects.filter(
                stage="WON"
            )
        )

        rows.append(
            ["CRM SALES REPORT"]
        )

        rows.append([])

        rows.append([
            "Total Deals",
            total_deals
        ])

        rows.append([
            "Won Deals",
            won_deals
        ])

        rows.append([
            "Revenue",
            f"₹ {revenue}"
        ])

        rows.append([])

        rows.append([
            "Deal Name",
            "Customer",
            "Stage",
            "Value"
        ])

        for deal in Deal.objects.all():

            customer = "-"

            if deal.lead:
                customer = (
                    deal.lead.customer.name
                )

            rows.append([

                deal.deal_name,

                customer,

                deal.stage,

                deal.deal_value
            ])

        rows.append([])

        rows.append([
            "Generated On",
            datetime.now().strftime(
                "%d-%m-%Y"
            )
        ])

        df = pd.DataFrame(rows)

        with pd.ExcelWriter(
            response,
            engine="openpyxl"
        ) as writer:

            df.to_excel(
                writer,
                index=False,
                header=False,
                sheet_name="Sales Report"
            )

        return response
    
class ExportLeadReportExcelView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        response = HttpResponse(
            content_type=
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )

        response[
            "Content-Disposition"
        ] = (
            'attachment; filename="lead_report.xlsx"'
        )

        rows = []

        total = (
            Lead.objects.count()
        )

        converted = (
            Lead.objects.filter(
                status="CONVERTED"
            ).count()
        )

        rate = 0

        if total > 0:

            rate = round(
                (
                    converted / total
                ) * 100,
                2
            )

        rows.append(
            ["CRM LEAD REPORT"]
        )

        rows.append([])

        rows.append([
            "Total Leads",
            total
        ])

        rows.append([
            "Converted Leads",
            converted
        ])

        rows.append([
            "Conversion Rate",
            f"{rate}%"
        ])

        rows.append([])

        rows.append([

            "Customer",

            "Assigned To",

            "Status",

            "Priority"
        ])

        for lead in Lead.objects.all():

            rows.append([

                lead.customer.name,

                lead.assigned_to.username,

                lead.status,

                lead.priority
            ])

        rows.append([])

        rows.append([
            "Generated On",
            datetime.now().strftime(
                "%d-%m-%Y"
            )
        ])

        df = pd.DataFrame(rows)

        with pd.ExcelWriter(
            response,
            engine="openpyxl"
        ) as writer:

            df.to_excel(
                writer,
                index=False,
                header=False,
                sheet_name="Lead Report"
            )

        return response
    
class ExportActivityReportExcelView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        response = HttpResponse(
            content_type=
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )

        response[
            "Content-Disposition"
        ] = (
            'attachment; filename="activity_report.xlsx"'
        )

        rows = []

        activities = (
            ActivityLog.objects.all()
        )

        rows.append(
            ["CRM ACTIVITY REPORT"]
        )

        rows.append([])

        rows.append([
            "Total Activities",
            activities.count()
        ])

        rows.append([])

        rows.append([

            "User",

            "Action",

            "Description",

            "Date"
        ])

        for activity in activities:

            rows.append([

                activity.user.username,

                activity.action_type,

                activity.description,

                activity.created_at.strftime(
                    "%d-%m-%Y"
                )
            ])

        rows.append([])

        rows.append([
            "Generated On",
            datetime.now().strftime(
                "%d-%m-%Y"
            )
        ])

        df = pd.DataFrame(rows)

        with pd.ExcelWriter(
            response,
            engine="openpyxl"
        ) as writer:

            df.to_excel(
                writer,
                index=False,
                header=False,
                sheet_name="Activity Report"
            )

        return response