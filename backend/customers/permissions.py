from rest_framework.permissions import BasePermission


class IsOwnerOrAdmin(BasePermission):

    def has_object_permission(
        self,
        request,
        view,
        obj,
    ):

        # Admin can access everything

        if request.user.role == "ADMIN":

            return True

        # Manager & Sales Executive
        # can access only their own customers

        return obj.created_by == request.user