from rest_framework.generics import get_object_or_404
from django.template import context
from .serializers import IncidenceSerializer
from ..slots.serializers import SlotSerializer
# from rest_framework.exceptions import NotFound
from rest_framework import generics, mixins, status, viewsets
from rest_framework.response import Response 
from .models import Incidence
from ..slots.models import Slot
from rest_framework.permissions import (AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)

class IncidenceView(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = IncidenceSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    
    def getAllIncidences(self,request):
        serializer = IncidenceSerializer.getAllIncidences(context)
        return Response(serializer,status=status.HTTP_200_OK)

    def createIncidence(self, request):

        serializer_context = {
            'user': None,
            'slot': request.data['slot'],
            'message': request.data['message'],
            'state': "Pending",
            'request': request
        }

        serializer = self.serializer_class(
            data = serializer_context,
            context = serializer_context
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()
        IncidenceSerializer.slotWarning(request.data['slot'])

        return Response(serializer.data, status=status.HTTP_200_OK)


    def updateIncidence(self, request, id):
        incidence = get_object_or_404(Incidence.objects.all(), id=id)
        data = request.data
                
        serializer = IncidenceSerializer(
            instance=incidence, data=data, partial=True)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
        return Response(IncidenceSerializer.to_incidence(incidence))

    def deleteIncidence(self, request, id):
        incidence = get_object_or_404(Incidence.objects.all(),id=id)
        incidence.delete()
        return Response({'data': 'Incidence deleted'})
    
    def deleteIncidences(self, request):
        serializer_context = {
            'ids': request.data['ids'],
            'request': request
        }

        if len(serializer_context['ids']) > 0:
            incidences,serializer = IncidenceSerializer.getIncidencesDelete(serializer_context)
            if len(serializer) != len(serializer_context['ids']):
                return Response({'data': "Some incidences doesn't exist"})
            incidences.delete()
            return Response({'data': 'Incidences deleted'})
        return Response({'data': 'No incidences provided'})

class IncidenceUserView(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = IncidenceSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    def createIncidence(self, request):

        serializer_context = {
            'user': request.user.id,
            'slot': request.data['slot'],
            'message': request.data['message'],
            'state': "Pending",
            'request': request
        }

        serializer = self.serializer_class(
            data = serializer_context,
            context = serializer_context
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()
        IncidenceSerializer.slotWarning(request.data['slot'])

        return Response(serializer.data, status=status.HTTP_200_OK)