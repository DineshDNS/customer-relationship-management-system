from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from .models import Customer
from .serializers import CustomerSerializer
from .permissions import IsOwnerOrAdminOrManager
from rest_framework import filters

class CustomerListCreateView(generics.ListCreateAPIView):

    queryset = Customer.objects.all().order_by("-created_at")

    serializer_class = CustomerSerializer

    permission_classes = [IsAuthenticated]
    
    filter_backends = [filters.SearchFilter]

    search_fields = [
        "name",
        "email",
        "phone",
        "company",
    ]

    def perform_create(self, serializer):
        serializer.save(
            created_by=self.request.user
        )


class CustomerDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Customer.objects.all()

    serializer_class = CustomerSerializer

    permission_classes = [
        IsAuthenticated,
        IsOwnerOrAdminOrManager,
    ]

    def perform_destroy(self, instance):

        if self.request.user.role == "SALES_EXECUTIVE":
            raise PermissionDenied(
                "Sales Executives cannot delete customers."
            )

        instance.delete()