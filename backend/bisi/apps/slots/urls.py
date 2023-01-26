from django.urls import path
from .view import SlotView

urlpatterns = [
    path('', SlotView.as_view({'get':'getAllSlots', 'post': 'createSlot'})),
    path('<int:id>', SlotView.as_view({'put': 'updateSlot'})),
]
