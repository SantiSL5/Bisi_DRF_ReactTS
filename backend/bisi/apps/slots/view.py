from ..core .permissions import IsAdmin
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

class SlotAdminView(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated, IsAdmin,)
    serializer_class = SlotSerializer
    http_method_names = ['get', 'post', 'put', 'delete']
    def createSlot(self, request):

        serializer_context = {
            'number': request.data['number'],
            'station': request.data['station'],
            'bike': None, 
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

        serialized_data = SlotSerializer.to_slot_create(serializer.data)

        return Response(serialized_data, status=status.HTTP_200_OK)
    
    def updateSlot(self, request, id):
        slot = get_object_or_404(Slot.objects.all(), id=id)
        data = request.data
                
        serializer = SlotSerializer(
            instance=slot, data=data, partial=True)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
        return Response(SlotSerializer.to_slot(slot))
    
    def deleteSlot(self, request, id):
        slot = get_object_or_404(Slot.objects.all(),id=id)
        slot.delete()
        return Response({'data': 'Slot deleted'})
    
    def deleteSlots(self, request):
        serializer_context = {
            'ids': request.data['ids'],
            'request': request
        }

        if len(serializer_context['ids']) > 0:
            slots,serializer = SlotSerializer.getSlotsDelete(serializer_context)
            if len(serializer) != len(serializer_context['ids']):
                return Response({'data': "Some slots doesn't exist"})
            slots.delete()
            return Response({'data': 'Slots deleted'})
        return Response({'data': 'No slots provided'})


