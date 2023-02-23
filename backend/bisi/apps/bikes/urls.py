from django.urls import path
from .view import BikeView, BikeAdminView

urlpatterns = [
    path('', BikeView.as_view({'get':'getAllBikes'})),
    # CRUD
    path('create/', BikeAdminView.as_view({ 'post': 'createBike'})),
    path('deleteMany/', BikeAdminView.as_view({'post': 'deleteBikes'})),
    path('<int:id>', BikeAdminView.as_view({'put': 'updateBike', 'delete': 'deleteBike'})),
]
