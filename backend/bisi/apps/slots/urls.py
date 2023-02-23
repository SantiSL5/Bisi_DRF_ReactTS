from django.urls import path
from .view import SlotAdminView, SlotView

urlpatterns = [
    path('', SlotView.as_view({'get':'getAllSlots'})),
    path('create/', SlotAdminView.as_view({'post': 'createSlot'})),
    path('deleteMany/', SlotAdminView.as_view({'post': 'deleteSlots'})),
    path('<int:id>', SlotAdminView.as_view({'put': 'updateSlot', 'delete': 'deleteSlot'})),
]
