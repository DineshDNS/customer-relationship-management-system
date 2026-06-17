from rest_framework.permissions import BasePermission


class IsOwnerOrAdminOrManager(BasePermission):

    def has_object_permission(self, request, view, obj):

        if request.user.role in [
            "ADMIN",
            "MANAGER"
        ]:
            return True

        return obj.created_by == request.user