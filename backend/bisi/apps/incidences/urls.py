from django.urls import path
from .view import IncidenceUserView, IncidenceView

urlpatterns = [
    #CRUD
    path('', IncidenceView.as_view({'get':'getAllIncidences', 'post': 'createIncidence'})),
    path('deleteMany/', IncidenceView.as_view({'post': 'deleteIncidences'})),
    path('<int:id>', IncidenceView.as_view({'put': 'updateIncidence', 'delete': 'deleteIncidence'})),
    #User authenticated
    path('user/', IncidenceUserView.as_view({'post': 'createIncidence'})),
]
