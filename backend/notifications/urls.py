from django.urls import path

from .views import (
    NotificationListView,
    NotificationReadView,
    NotificationReadAllView,
    NotificationDeleteView,
    NotificationUnreadCountView,
)

urlpatterns = [

    path(
        "",
        NotificationListView.as_view(),
        name="notification-list",
    ),

    path(
        "<int:pk>/read/",
        NotificationReadView.as_view(),
        name="notification-read",
    ),

    path(
        "read-all/",
        NotificationReadAllView.as_view(),
        name="notification-read-all",
    ),

    path(
        "<int:pk>/delete/",
        NotificationDeleteView.as_view(),
        name="notification-delete",
    ),

    path(
        "unread-count/",
        NotificationUnreadCountView.as_view(),
        name="notification-unread-count",
    ),

]