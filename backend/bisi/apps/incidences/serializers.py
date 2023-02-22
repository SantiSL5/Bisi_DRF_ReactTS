from rest_framework.generics import get_object_or_404
from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import Incidence
from django.db import connection, transaction

class IncidenceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Incidence
        fields = (
            'id',
            'user',
            'slot',
            'message',
            'state'
        )

    def to_incidence(instance):
        return {
            'id': instance.id,
            'user': None if instance.user == None else instance.user.id,
            'slot': instance.slot.id,
            'message': instance.message,
            'state': instance.state
        }
    
    def slotWarning(slot):
        cursor = connection.cursor()
        cursor.execute('''UPDATE bisi.slots_slot SET warning = true where id = %s''',[slot])
        transaction.commit()
    
    def getAllIncidences(context):

        incidences = Incidence.objects.all()
        serialized_incidences= []
        for incidence in incidences.iterator():
            serialized_incidence=IncidenceSerializer.to_incidence(incidence)
            serialized_incidences.append(serialized_incidence)

        return serialized_incidences
    
    def getIncidencesDelete(context):

        incidences = Incidence.objects.filter(id__in=context['ids'])
        serialized_incidences= []
        for incidence in incidences.iterator():
            serialized_incidence=IncidenceSerializer.to_incidence(incidence)
            serialized_incidences.append(serialized_incidence)

        return incidences,serialized_incidences
    
    def getIncidencesSlot(slot):

        incidences = Incidence.objects.filter(slot_id=slot)
        serialized_incidences= []
        for incidence in incidences.iterator():
            serialized_incidence=IncidenceSerializer.to_incidence(incidence)
            serialized_incidences.append(serialized_incidence)

        return serialized_incidences
    
    def getIncidenceById(id):
        if id != None:
            incidence = get_object_or_404(Incidence.objects.all(), id=id)
            serialized_incidence = IncidenceSerializer.to_incidence(incidence)
            return serialized_incidence
        
        return None
    
    
    