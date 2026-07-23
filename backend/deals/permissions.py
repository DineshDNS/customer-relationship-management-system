from rest_framework.permissions import BasePermission


class IsDealOwnerOrAdminOrManager(
    BasePermission
):

    def has_object_permission(
        self,
        request,
        view,
        obj
    ):

        # -------------------------
        # Admin
        # -------------------------

        if request.user.role == "ADMIN":

            return True

        # -------------------------
        # Manager
        # -------------------------

        if request.user.role == "MANAGER":

            return True

        # -------------------------
        # Sales Executive
        # -------------------------

        return (

            obj.assigned_to == request.user

        )