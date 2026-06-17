from rest_framework.permissions import (
    BasePermission
)


class IsTaskOwnerOrAdminOrManager(
    BasePermission
):

    def has_object_permission(
        self,
        request,
        view,
        obj
    ):

        if request.user.role in [
            "ADMIN",
            "MANAGER",
        ]:
            return True

        return (
            obj.assigned_to
            == request.user
        )