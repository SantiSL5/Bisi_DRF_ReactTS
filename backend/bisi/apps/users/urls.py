from django.urls import path
from .view import UserView, UserAuthenticatedView

urlpatterns = [
    path('register/', UserView.as_view({'post': 'register'})),
    path('login/', UserView.as_view({'post': 'login'})),
    
    # path('refreshToken/', UserAuthenticatedView.as_view({'post': 'refreshToken'})),
    path('user', UserAuthenticatedView.as_view({'get': 'getUser'})),
    path('addFunds', UserAuthenticatedView.as_view({'put': 'addFunds'})),
    
    # CRUD
    path('', UserAuthenticatedView.as_view({'get': 'getAllUsers', 'post': 'createUser'})),
    path('<int:id>', UserAuthenticatedView.as_view({'put': 'updateUser', 'delete': 'deleteUser'})),
    path('deleteMany/', UserAuthenticatedView.as_view({'post': 'deleteUsers'})),
    
]
