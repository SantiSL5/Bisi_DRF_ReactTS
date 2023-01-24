from django.urls import path
from .view import BikeView

urlpatterns = [
    path('', BikeView.as_view({'get':'getAllBikes', 'post': 'createBike'})),
    # path('', BikeView.as_view({'post': 'createBike'})),
]
