from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import Slot

class SlotSerializer(serializers.ModelSerializer):

    class Meta:
        model = Slot
        fields = (
            'number',
            'station'
            'warning', 
            'disabled'
        )

    def to_slot(instance):
        return {
            'number' : instance.number,
            'station' : instance.station,
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