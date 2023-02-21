from django.urls import path
from .view import RentView, RentUserView

urlpatterns = [
    path('', RentView.as_view({'get':'getAllRents', 'post': 'createRent'})),
    path('deleteMany/', RentView.as_view({'post': 'deleteRents'})),
    path('<int:id>', RentView.as_view({'put': 'updateRent', 'delete': 'deleteRent'})),
    path('user', RentUserView.as_view({'get':'getCurrentRent', 'put':'returnBike'})),
]
