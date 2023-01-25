from django.urls import path
from .view import StationView

urlpatterns = [
    path('', StationView.as_view({'get':'getAllStations'})),
]
