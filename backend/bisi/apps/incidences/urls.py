from django.urls import path
from .view import IncidenceSlotView, IncidenceUserView, IncidenceView

urlpatterns = [
    #CRUD
    path('', IncidenceView.as_view({'get':'getAllIncidences', 'post': 'createIncidence'})),
    path('deleteMany/', IncidenceView.as_view({'post': 'deleteIncidences'})),
    path('<int:id>', IncidenceView.as_view({'put': 'updateIncidence', 'delete': 'deleteIncidence'})),
    #User authenticated
    path('user/', IncidenceUserView.as_view({'get':'getIncidencesByUser','post': 'createIncidence'})),
    #All users
    path('slot/<int:slot>', IncidenceSlotView.as_view({'get': 'getIncidencesSlot'})),
]
