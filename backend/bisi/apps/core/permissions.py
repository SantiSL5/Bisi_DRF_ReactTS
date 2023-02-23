from rest_framework import permissions
from ..users .models import User

class IsAdmin(permissions.BasePermission):
    message = 'You are not an admin'
    def has_permission(self, request, view):
        try:
            user = User.objects.get(id=request.user.id)
            return user.type == 'admin'
        except:
            return False
