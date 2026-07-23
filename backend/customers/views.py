from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters

from .models import Customer
from .serializers import CustomerSerializer
from .permissions import IsOwnerOrAdmin

from activities.services import (
    create_activity_log,
)

from notifications.services import (
    create_notification,
)


# ==========================================
# Customer List & Create
# ==========================================

class CustomerListCreateView(
    generics.ListCreateAPIView
):

    serializer_class = CustomerSerializer

    permission_classes = [
        IsAuthenticated
    ]

    # Disable pagination for CRM project
    pagination_class = None

    filter_backends = [
        filters.SearchFilter
    ]

    search_fields = [
        "name",
        "email",
        "phone",
        "company",
    ]

    def get_queryset(self):

        user = self.request.user

        # Admin -> All Customers
        if user.role == "ADMIN":

            return Customer.objects.all().order_by(
                "-created_at"
            )

        # Manager & Sales Executive
        return Customer.objects.filter(
            created_by=user
        ).order_by(
            "-created_at"
        )

    def perform_create(
        self,
        serializer
    ):

        customer = serializer.save(
            created_by=self.request.user
        )

        create_activity_log(

            user=self.request.user,

            action_type="CUSTOMER_CREATED",

            description=f"Customer '{customer.name}' created."

        )

        create_notification(

            user=self.request.user,

            title="Customer Created",

            message=f"Customer '{customer.name}' created successfully."

        )


# ==========================================
# Customer Detail
# ==========================================

class CustomerDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = CustomerSerializer

    permission_classes = [

        IsAuthenticated,

        IsOwnerOrAdmin,

    ]

    def get_queryset(self):

        user = self.request.user

        # Admin -> All Customers
        if user.role == "ADMIN":

            return Customer.objects.all()

        # Manager & Sales Executive
        return Customer.objects.filter(
            created_by=user
        )

    def perform_update(
        self,
        serializer
    ):

        customer = serializer.save()

        create_activity_log(

            user=self.request.user,

            action_type="CUSTOMER_UPDATED",

            description=f"Customer '{customer.name}' updated."

        )

        create_notification(

            user=self.request.user,

            title="Customer Updated",

            message=f"Customer '{customer.name}' updated successfully."

        )

    def perform_destroy(
        self,
        instance
    ):

        customer_name = instance.name

        create_activity_log(

            user=self.request.user,

            action_type="CUSTOMER_DELETED",

            description=f"Customer '{customer_name}' deleted."

        )

        create_notification(

            user=self.request.user,

            title="Customer Deleted",

            message=f"Customer '{customer_name}' deleted successfully."

        )

        instance.delete()