from rest_framework import generics
from rest_framework import filters

from rest_framework.permissions import (
    IsAuthenticated
)

from rest_framework.exceptions import (
    PermissionDenied
)

from .models import Task
from .serializers import TaskSerializer
from .permissions import (
    IsTaskOwnerOrAdminOrManager
)

from datetime import date

from rest_framework.views import APIView
from rest_framework.response import Response

from .services import (
    validate_task_transition
)

from .status_serializer import (
    TaskStatusSerializer
)

from activities.services import (
    create_activity_log
)


# ==============================
# Task List & Create
# ==============================

class TaskListCreateView(
    generics.ListCreateAPIView
):

    queryset = Task.objects.all().order_by(
        "-created_at"
    )

    serializer_class = TaskSerializer

    permission_classes = [
        IsAuthenticated
    ]

    filter_backends = [
        filters.SearchFilter
    ]

    search_fields = [
        "title",
        "status",
        "task_type",
    ]

    def perform_create(
        self,
        serializer
    ):

        task = serializer.save(
            created_by=self.request.user
        )

        create_activity_log(

            user=self.request.user,

            action_type=
            "TASK_CREATED",

            description=
            f"Task '{task.title}' created"
        )


# ==============================
# Task Detail
# ==============================

class TaskDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Task.objects.all()

    serializer_class = TaskSerializer

    permission_classes = [
        IsAuthenticated,
        IsTaskOwnerOrAdminOrManager,
    ]

    def perform_destroy(
        self,
        instance
    ):

        if (
            self.request.user.role
            == "SALES_EXECUTIVE"
        ):
            raise PermissionDenied(
                "Sales Executives cannot delete tasks."
            )

        instance.delete()

# ==============================
# Task Status Update
# ==============================

class TaskStatusUpdateView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def patch(
        self,
        request,
        pk
    ):

        task = Task.objects.get(
            pk=pk
        )

        serializer = (
            TaskStatusSerializer(
                data=request.data
            )
        )

        serializer.is_valid(
            raise_exception=True
        )

        new_status = (
            serializer.validated_data[
                "status"
            ]
        )

        if not validate_task_transition(
            task.status,
            new_status
        ):
            return Response(
                {
                    "error":
                    "Invalid task transition"
                },
                status=400
            )

        task.status = new_status

        task.save()

        if new_status == "COMPLETED":

            create_activity_log(

                user=request.user,

                action_type=
                "TASK_COMPLETED",

                description=
                f"Task '{task.title}' completed"
            )

        return Response(
            {
                "message":
                f"Task moved to {new_status}"
            }
        )
    
# ==============================
# My Tasks
# ==============================

class MyTasksView(
    generics.ListAPIView
):

    serializer_class = TaskSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(
        self
    ):

        return Task.objects.filter(
            assigned_to=self.request.user
        ).order_by(
            "due_date"
        )
    
# ==============================
# Overdue Tasks
# ==============================

class OverdueTasksView(
    generics.ListAPIView
):

    serializer_class = TaskSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(
        self
    ):

        return Task.objects.filter(

            due_date__lt=date.today()

        ).exclude(

            status="COMPLETED"

        )
    
# ==============================
# Today's Tasks
# ==============================

class TodayTasksView(
    generics.ListAPIView
):

    serializer_class = TaskSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(
        self
    ):

        return Task.objects.filter(
            due_date=date.today()
        )