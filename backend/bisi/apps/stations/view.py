from rest_framework.generics import get_object_or_404
from django.template import context
from .serializers import StationSerializer
# from rest_framework.exceptions import NotFound
from rest_framework import generics, mixins, status, viewsets
from rest_framework.response import Response 
from .models import Station
from rest_framework.permissions import (AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)

class StationView(viewsets.GenericViewSet):
    permission_classes = (AllowAny,)
    serializer_class = StationSerializer
    http_method_names = ['get']

    
    def getAllStations(self,request):
        serializer = StationSerializer.getAllStations(context)
        return Response(serializer,status=status.HTTP_200_OK)