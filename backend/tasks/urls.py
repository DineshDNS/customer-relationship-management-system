from django.urls import path

from .views import (

    TaskListCreateView,

    TaskDetailView,

    TaskStatusUpdateView,

    MyTasksView,

    TodayTasksView,

    OverdueTasksView,

)

urlpatterns = [

    path(
        "",
        TaskListCreateView.as_view(),
        name="task-list-create",
    ),

    path(
        "my-tasks/",
        MyTasksView.as_view(),
        name="my-tasks",
    ),

    path(
        "today/",
        TodayTasksView.as_view(),
        name="today-tasks",
    ),

    path(
        "overdue/",
        OverdueTasksView.as_view(),
        name="overdue-tasks",
    ),

    path(
        "<int:pk>/",
        TaskDetailView.as_view(),
        name="task-detail",
    ),

    path(
        "<int:pk>/status/",
        TaskStatusUpdateView.as_view(),
        name="task-status-update",
    ),

]