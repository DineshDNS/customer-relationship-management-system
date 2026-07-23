from rest_framework.permissions import BasePermission


class IsLeadOwnerOrAdmin(BasePermission):

    def has_object_permission(
        self,
        request,
        view,
        obj,
    ):

        # Admin can access every lead

        if request.user.role == "ADMIN":

            return True

        # Manager & Sales Executive
        # can access only leads assigned to them

        return obj.assigned_to == request.user