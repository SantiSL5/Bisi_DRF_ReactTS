from django.urls import path
from .view import StationAdminView, StationView

urlpatterns = [
    path('', StationView.as_view({'get':'getAllStations'})),
    path('slots', StationView.as_view({'get':'getAllStationsWithSlots'})),
    #CRUD
    path('create/', StationAdminView.as_view({'post': 'createStation'})),
    path('deleteMany/', StationAdminView.as_view({'post': 'deleteStations'})),
    path('<int:id>', StationAdminView.as_view({'put': 'updateStation', 'delete': 'deleteStation'})),
]
