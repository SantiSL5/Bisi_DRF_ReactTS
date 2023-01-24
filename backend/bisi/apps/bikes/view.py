from django.template import context
from .serializers import bikeSerializer
# from rest_framework.exceptions import NotFound
from rest_framework import generics, mixins, status, viewsets
from rest_framework.response import Response 
from .models import Bike
from rest_framework.permissions import (AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)

class BikeView(mixins.DestroyModelMixin,viewsets.GenericViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = bikeSerializer
    def getAllBikes(self,request):
        # serializer_context = {
        # }
        serializer = bikeSerializer.getAllBikes(context)
        return Response(serializer,status=status.HTTP_200_OK)