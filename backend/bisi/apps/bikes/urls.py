from django.urls import path
from .view import BikeView

urlpatterns = [
    path('', BikeView.as_view({'get':'getAllBikes', 'post': 'createBike'})),
    path('deleteMany/', BikeView.as_view({'post': 'deleteBikes'})),
    path('<int:id>', BikeView.as_view({'put': 'updateBike', 'delete': 'deleteBike'})),
]
