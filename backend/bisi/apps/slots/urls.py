from django.urls import path
from .view import SlotView

urlpatterns = [
    path('', SlotView.as_view({'get':'getAllSlots'})),
]
