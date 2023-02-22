from django.urls import path
from .view import RentView, RentUserView

urlpatterns = [
    #CRUD admin
    path('rents', RentView.as_view({'get':'getAllRents'})),
    path('deleteMany/', RentView.as_view({'post': 'deleteRents'})),
    path('<int:id>', RentView.as_view({'put': 'updateRent', 'delete': 'deleteRent'})),
    #User authenticated
    path('', RentUserView.as_view({'post': 'createRent'})),
    path('user', RentUserView.as_view({'get':'getCurrentRent', 'put':'returnBike'})),
]
