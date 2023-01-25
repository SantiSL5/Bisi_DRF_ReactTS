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
    http_method_names = ['get', 'post', 'put']

    
    def getAllStations(self,request):
        serializer = StationSerializer.getAllStations(context)
        return Response(serializer,status=status.HTTP_200_OK)
    
    def createStation(self, request):

        serializer_context = {
            'name': request.data['name'],
            'warning': request.data['warning'],
            'disabled': request.data['disabled'],
            'request': request
        }

        serializer_data = request.data

        serializer = self.serializer_class(
            data = serializer_data,
            context = serializer_context
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
    def updateStation(self, request, slug):
        station = get_object_or_404(Station.objects.all(), slug=slug)
        data = request.data
                
        serializer = StationSerializer(
            instance=station, data=data, partial=True)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
        return Response(serializer.data)
