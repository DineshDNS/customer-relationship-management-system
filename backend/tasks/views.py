from datetime import date

from django.shortcuts import get_object_or_404

from rest_framework import filters
from rest_framework import generics

from rest_framework.permissions import (
    IsAuthenticated
)

from rest_framework.exceptions import (
    PermissionDenied
)

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer
from .permissions import (
    IsTaskOwnerOrAdminOrManager
)

from .services import (
    validate_task_transition
)

from .status_serializer import (
    TaskStatusSerializer
)

from activities.services import (
    create_activity_log
)

from notifications.services import (
    create_notification
)


# =====================================
# Task List & Create
# =====================================

class TaskListCreateView(
    generics.ListCreateAPIView
):

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
        "customer__name",
    ]

    def get_queryset(
        self
    ):

        user = self.request.user

        if user.role in [

            "ADMIN",

            "MANAGER",

        ]:

            return Task.objects.all().order_by(
                "-created_at"
            )

        return Task.objects.filter(

            assigned_to=user

        ).order_by(

            "-created_at"

        )

    def perform_create(
        self,
        serializer
    ):

        task = serializer.save(
            created_by=self.request.user
        )

        create_activity_log(

            user=self.request.user,

            action_type="TASK_CREATED",

            description=(
                f"Task '{task.title}' created."
            )

        )

        create_notification(

            user=task.assigned_to,

            notification_type="TASK",

            title="New Task Assigned",

            message=(
                f"You have been assigned "
                f"'{task.title}'."
            )

        )

    # =====================================
# Task Detail
# Retrieve
# Update
# Delete
# =====================================

class TaskDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Task.objects.all()

    serializer_class = TaskSerializer

    permission_classes = [
        IsAuthenticated,
        IsTaskOwnerOrAdminOrManager,
    ]

    # ---------------------------------
    # Update Task
    # ---------------------------------

    def perform_update(
        self,
        serializer
    ):

        if (
            self.request.user.role
            == "SALES_EXECUTIVE"
        ):

            raise PermissionDenied(
                "Sales Executives cannot edit tasks."
            )

        task = serializer.save()

        # Activity Log

        create_activity_log(

            user=self.request.user,

            action_type="TASK_UPDATED",

            description=(
                f"Task '{task.title}' updated."
            )

        )

        # Notify Assigned User

        if task.assigned_to:

            create_notification(

                user=task.assigned_to,

                notification_type="TASK",

                title="Task Updated",

                message=(
                    f"Task '{task.title}' has been updated."
                )

            )

        # Notify Creator

        if (
            task.created_by
            != task.assigned_to
        ):

            create_notification(

                user=task.created_by,

                notification_type="TASK",

                title="Task Updated",

                message=(
                    f"Your task '{task.title}' has been updated."
                )

            )

    # ---------------------------------
    # Delete Task
    # ---------------------------------

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

        # Activity Log

        create_activity_log(

            user=self.request.user,

            action_type="TASK_DELETED",

            description=(
                f"Task '{instance.title}' deleted."
            )

        )

        # Notify Assigned User

        if instance.assigned_to:

            create_notification(

                user=instance.assigned_to,

                notification_type="TASK",

                title="Task Deleted",

                message=(
                    f"Task '{instance.title}' has been deleted."
                )

            )

        # Notify Creator

        if (
            instance.created_by
            != instance.assigned_to
        ):

            create_notification(

                user=instance.created_by,

                notification_type="TASK",

                title="Task Deleted",

                message=(
                    f"Your task '{instance.title}' has been deleted."
                )

            )

        instance.delete()

# =====================================
# Task Status Update
# =====================================

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

        task = get_object_or_404(
            Task,
            pk=pk
        )

        # ---------------------------------
        # Permission
        # ---------------------------------

        if request.user.role == "SALES_EXECUTIVE":

            if task.assigned_to != request.user:

                raise PermissionDenied(
                    "You can only update your assigned tasks."
                )

        serializer = TaskStatusSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        new_status = serializer.validated_data[
            "status"
        ]

        # ---------------------------------
        # Validate Status Flow
        # ---------------------------------

        if not validate_task_transition(
            task.status,
            new_status
        ):

            return Response(
                {
                    "error":
                    "Invalid task status transition."
                },
                status=400
            )

        old_status = task.status

        task.status = new_status

        task.save()

        # ---------------------------------
        # Activity Log
        # ---------------------------------

        create_activity_log(

            user=request.user,

            action_type="TASK_STATUS_UPDATED",

            description=(
                f"Task '{task.title}' "
                f"changed from "
                f"{old_status} "
                f"to "
                f"{new_status}."
            )

        )

        # ---------------------------------
        # Notify Assigned User
        # ---------------------------------

        if task.assigned_to:

            create_notification(

                user=task.assigned_to,

                notification_type="TASK",

                title="Task Status Updated",

                message=(
                    f"Task '{task.title}' "
                    f"is now "
                    f"{new_status}."
                )

            )

        # ---------------------------------
        # Notify Creator
        # ---------------------------------

        if (
            task.created_by
            and
            task.created_by != task.assigned_to
        ):

            create_notification(

                user=task.created_by,

                notification_type="TASK",

                title="Task Status Updated",

                message=(
                    f"Task '{task.title}' "
                    f"is now "
                    f"{new_status}."
                )

            )

        # ---------------------------------
        # Task Completed
        # ---------------------------------

        if new_status == "COMPLETED":

            if task.assigned_to:

                create_notification(

                    user=task.assigned_to,

                    notification_type="TASK",

                    title="🎉 Task Completed",

                    message=(
                        f"Congratulations! "
                        f"You completed "
                        f"'{task.title}'."
                    )

                )

        return Response({

            "message":
            "Task status updated successfully."

        })

# =====================================
# My Tasks
# =====================================

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

            "due_date",

            "-created_at",

        )


# =====================================
# Today's Tasks
# =====================================

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

        user = self.request.user

        queryset = Task.objects.filter(

            due_date=date.today()

        )

        if user.role in [

            "ADMIN",

            "MANAGER",

        ]:

            return queryset.order_by(

                "due_date",

                "-created_at",

            )

        return queryset.filter(

            assigned_to=user

        ).order_by(

            "due_date",

            "-created_at",

        )


# =====================================
# Overdue Tasks
# =====================================

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

        user = self.request.user

        queryset = Task.objects.filter(

            due_date__lt=date.today()

        ).exclude(

            status="COMPLETED"

        )

        if user.role in [

            "ADMIN",

            "MANAGER",

        ]:

            return queryset.order_by(

                "due_date"

            )

        return queryset.filter(

            assigned_to=user

        ).order_by(

            "due_date"

        )