from django.urls import path
from .view import UserView

urlpatterns = [
    path('register/', UserView.as_view({'post': 'register'})),
    path('login/', UserView.as_view({'post': 'login'})),
    
    # path('refreshToken/', UserAuthenticatedView.as_view({'post': 'refreshToken'})),
    # path('user', UserAuthenticatedView.as_view({'get': 'getUser'})),
]
