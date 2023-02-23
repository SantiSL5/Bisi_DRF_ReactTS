from rest_framework.generics import get_object_or_404
from django.template import context
from .serializers import RentSerializer
# from rest_framework.exceptions import NotFound
from rest_framework import generics, mixins, status, viewsets
from rest_framework.response import Response 
from .models import Rent
from rest_framework.permissions import (AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)

class RentView(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = RentSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    
    def getAllRents(self,request):
        serializer = RentSerializer.getAllRents(context)
        return Response(serializer,status=status.HTTP_200_OK)
    
    def updateRent(self, request, id):

        rent = get_object_or_404(Rent.objects.all(), id=id)
        data = request.data
                
        serializer = RentSerializer(
            instance=rent, data=data, partial=True)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
        return Response(RentSerializer.to_rent(rent))
    
    def deleteRent(self, request, id):
        slot = get_object_or_404(Rent.objects.all(),id=id)
        slot.delete()
        return Response({'data': 'Rent deleted'})
    
    def deleteRents(self, request):
        serializer_context = {
            'ids': request.data['ids'],
            'request': request
        }

        if len(serializer_context['ids']) > 0:
            rents,serializer = RentSerializer.getRentsDelete(serializer_context)
            if len(serializer) != len(serializer_context['ids']):
                return Response({'data': "Some rents doesn't exist"})
            rents.delete()
            return Response({'data': 'Rents deleted'})
        return Response({'data': 'No rents provided'})
    
class RentUserView(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = RentSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    def getCurrentRent(self,request):
        rent = RentSerializer.getCurrentRent(request.user.id)
        if rent == False:
            return Response(rent,status=status.HTTP_200_OK)
        serializer = RentSerializer.to_rent(rent)
        return Response(serializer,status=status.HTTP_200_OK)
    

    def getRentsByUser(self,request):
        serializer = RentSerializer.getRentsByUser(request.user.id)
        return Response(serializer,status=status.HTTP_200_OK)
    
        
    def createRent(self, request):
        bike=RentSerializer.Slot_bike(request.data)
        user=request.user.id
        check_user=Rent.objects.raw('''SELECT * FROM bisi.users_user WHERE id = %s''',[user])
        if check_user[0].balance<0:
            return Response({'data': "Not enough funds"})
        if RentSerializer.getCurrentRent(user) != False:
            return Response({'data': "You already have a bike"})
        if bike == None:
            return Response({'data': "There isn't a bike here"})
        serializer_context = {
            'user': request.user.id,
            'starting_slot': request.data['starting_slot'],
            'bike': bike,
            'active': True,
            'request': request
        }

        serializer = self.serializer_class(
            data = serializer_context,
            context = serializer_context
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        serialized_data = RentSerializer.to_rent_create(serializer.data,user,bike)
        RentSerializer.Take_bike(serializer_context)

        return Response(serialized_data, status=status.HTTP_200_OK)
    
    def returnBike(self,request):
        serializer = RentSerializer.returnBike(request.user.id, request.data['ending_slot'])
        return Response(serializer,status=status.HTTP_200_OK)