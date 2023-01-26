from django.urls import path
from .view import StationView

urlpatterns = [
    path('', StationView.as_view({'get':'getAllStations', 'post': 'createStation'})),
    path('<int:id>', StationView.as_view({'put': 'updateStation', 'delete': 'deleteStation'})),
]
