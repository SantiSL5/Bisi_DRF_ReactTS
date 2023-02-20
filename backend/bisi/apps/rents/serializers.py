from dataclasses import fields
from datetime import datetime, timezone
import math
from pyexpat import model
from ..slots .serializers import SlotSerializer
from rest_framework import serializers
from .models import Rent
from ..stations .serializers import StationSerializer
from ..bikes .serializers import BikeSerializer
from django.db import connection, transaction

class RentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rent
        fields = (
            'id',
            'user',
            'bike',
            'starting_slot',
            'ending_slot',
            'duration',
            'created_at',
            'returned_at'
        )

    def to_rent(instance):
        return {
            'id': instance.id,
            'user' : instance.user.id,
            'bike' : BikeSerializer.to_bike(instance.bike),
            'starting_slot': instance.starting_slot.id,
            'ending_slot' : None if instance.ending_slot == None else instance.ending_slot ,
            'active' : instance.active,
            'duration' : instance.duration,
            'cost': instance.cost,
            'created_at': instance.created_at,
            'returned_at': instance.returned_at
        }

    def to_rent_create(instance,user,bike):
        return {
            'id': instance["id"],
            'user' : user,
            'bike': BikeSerializer.getBikeById(bike),
            'starting_slot': SlotSerializer.getSlotById(instance["starting_slot"]),
            'ending_slot' : None,
            'duration' : None,
            'active': True,
            'returned_at': None
        }
    
    def Slot_bike(instance):
        starting_slot=int(instance['starting_slot'])
        slot = Rent.objects.raw('''SELECT * FROM bisi.slots_slot WHERE bike_id IS NOT NULL AND id = %s''',[starting_slot])
        if len(slot) == 0:
            return None
        return slot[0].bike_id
    
    def Take_bike(interface):
        cursor = connection.cursor()
        starting_slot=int(interface['starting_slot'])
        cursor.execute('''UPDATE bisi.slots_slot SET bike_id = NULL WHERE id = %s''',[starting_slot])
        transaction.commit()

    def getCurrentRent(user):

        rent = Rent.objects.filter(user_id=user, active=True)[0]
        duration,cost=RentSerializer.updateRentValues(rent)
        if rent == None:
            return False
        cursor = connection.cursor()
        cursor.execute('''UPDATE bisi.rents_rent SET duration = %s,cost = %s WHERE id = %s''',[duration, cost, rent.id])
        transaction.commit()
        rent = Rent.objects.filter(user_id=user, active=True)[0]
        serialized_rent=RentSerializer.to_rent(rent)

        return serialized_rent
    
    def updateRentValues(rent):
        current_time=datetime.now(timezone.utc)
        duration=current_time-rent.created_at
        duration_m=math.trunc(duration.total_seconds() / 60)
        cost=math.trunc(math.ceil(duration_m/30))*0.5
        return duration_m,cost


    def getAllRents(context):

        rents = Rent.objects.all()
        serialized_rents= []
        for rent in rents.iterator():
            serialized_rent=RentSerializer.to_rent(rent)
            serialized_rents.append(serialized_rent)

        return serialized_rents
    
    def getRentsDelete(context):

        rents = Rent.objects.filter(id__in=context['ids'])
        serialized_rents= []
        for rent in rents.iterator():
            serialized_rent=RentSerializer.to_rent(rent)
            serialized_rents.append(serialized_rent)

        return rents,serialized_rents