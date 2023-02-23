from django.urls import path
from .view import RentAdminView, RentView, RentUserView

urlpatterns = [
    path('rents', RentView.as_view({'get':'getAllRents'})),
    #CRUD admin
    path('deleteMany/', RentAdminView.as_view({'post': 'deleteRents'})),
    path('<int:id>', RentAdminView.as_view({'put': 'updateRent', 'delete': 'deleteRent'})),
    #User authenticated
    path('', RentUserView.as_view({'post': 'createRent'})),
    path('user', RentUserView.as_view({'get':'getCurrentRent', 'put':'returnBike'})),
    path('user/rents', RentUserView.as_view({'get':'getRentsByUser'})),
]
