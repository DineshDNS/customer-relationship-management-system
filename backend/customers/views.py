from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Customer
from .serializers import CustomerSerializer


class CustomerCreateView(generics.CreateAPIView):

    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(
            created_by=self.request.user
        )


class CustomerListView(generics.ListAPIView):

    queryset = Customer.objects.all().order_by("-created_at")

    serializer_class = CustomerSerializer

    permission_classes = [IsAuthenticated]


class CustomerDetailView(generics.RetrieveAPIView):

    queryset = Customer.objects.all()

    serializer_class = CustomerSerializer

    permission_classes = [IsAuthenticated]