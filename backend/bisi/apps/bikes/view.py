from ..core .permissions import IsAdmin
from rest_framework.generics import get_object_or_404
from django.template import context
from .serializers import BikeSerializer
from ..slots.serializers import SlotSerializer
# from rest_framework.exceptions import NotFound
from rest_framework import generics, mixins, status, viewsets
from rest_framework.response import Response 
from .models import Bike
from ..slots.models import Slot
from rest_framework.permissions import (AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)

class BikeView(viewsets.GenericViewSet):
    permission_classes = (AllowAny,)
    serializer_class = BikeSerializer
    http_method_names = ['get']

    
    def getAllBikes(self,request):
        serializer = BikeSerializer.getAllBikes(context)
        return Response(serializer,status=status.HTTP_200_OK)

class BikeAdminView(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated, IsAdmin)
    serializer_class = BikeSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    def createBike(self, request):

        serializer_context = {
            'number': request.data['number'],
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


    def updateBike(self, request, id):
        bike = get_object_or_404(Bike.objects.all(), id=id)
        data = request.data
                
        serializer = BikeSerializer(
            instance=bike, data=data, partial=True)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
        return Response(BikeSerializer.to_bike(bike))

    def deleteBike(self, request, id):
        bike = get_object_or_404(Bike.objects.all(),id=id)
        bike.delete()
        return Response({'data': 'Bike deleted'})
    
    def deleteBikes(self, request):
        serializer_context = {
            'ids': request.data['ids'],
            'request': request
        }

        if len(serializer_context['ids']) > 0:
            bikes,serializer = BikeSerializer.getBikesDelete(serializer_context)
            if len(serializer) != len(serializer_context['ids']):
                return Response({'data': "Some bikes doesn't exist"})
            bikes.delete()
            return Response({'data': 'Bikes deleted'})
        return Response({'data': 'No bikes provided'})

