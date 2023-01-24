from django.template import context
from .serializers import bikeSerializer
# from rest_framework.exceptions import NotFound
from rest_framework import generics, mixins, status, viewsets
from rest_framework.response import Response 
from .models import Bike
from rest_framework.permissions import (AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)

class BikeView(mixins.DestroyModelMixin,viewsets.GenericViewSet):
    permission_classes = (AllowAny,)
    serializer_class = bikeSerializer
    http_method_names = ['get', 'post']
    http_method_names.append("post")

    
    def getAllBikes(self,request):
        # serializer_context = {
        # }
        serializer = bikeSerializer.getAllBikes(context)
        return Response(serializer,status=status.HTTP_200_OK)

    def createBike(self, request):

        serializer_context = {
            'number': request.data['number'],
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
