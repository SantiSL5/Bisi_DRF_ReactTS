from rest_framework.generics import get_object_or_404
from django.template import context
from .serializers import SlotSerializer
# from rest_framework.exceptions import NotFound
from rest_framework import generics, mixins, status, viewsets
from rest_framework.response import Response 
from .models import Slot
from rest_framework.permissions import (AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)

class SlotView(viewsets.GenericViewSet):
    permission_classes = (AllowAny,)
    serializer_class = SlotSerializer
    http_method_names = ['get']

    
    def getAllSlots(self,request):
        serializer = SlotSerializer.getAllSlots(context)
        return Response(serializer,status=status.HTTP_200_OK)