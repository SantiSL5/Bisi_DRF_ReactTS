from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import Slot
from ..stations .serializers import StationSerializer
from ..bikes .serializers import BikeSerializer

class SlotSerializer(serializers.ModelSerializer):

    class Meta:
        model = Slot
        fields = (
            'id',
            'number',
            'station',
            'bike',
            'warning', 
            'disabled'
        )

    def to_slot(instance):
        return {
            'id': instance.id,
            'number' : instance.number,
            'station' : StationSerializer.to_station(instance.station),
            'bike': instance.bike_id if instance.bike_id == None else BikeSerializer.to_bike(instance.bike),
            'warning' : instance.warning,
            'disabled' : instance.disabled
        }

    def getAllSlots(context):

        slots = Slot.objects.all()
        serialized_slots= []
        for slot in slots.iterator():
            serialized_slot=SlotSerializer.to_slot(slot)
            serialized_slots.append(serialized_slot)

        return serialized_slots