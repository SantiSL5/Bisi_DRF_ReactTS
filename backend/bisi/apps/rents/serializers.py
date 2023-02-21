from rest_framework.generics import get_object_or_404
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
            'ending_slot' : None if instance.ending_slot == None else instance.ending_slot.id ,
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
        check_slot=Rent.objects.raw('''SELECT * FROM bisi.slots_slot WHERE id = %s''',[starting_slot])
        if len(check_slot) == 0:
            return { "data": "Slot not found" }
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

        rent = Rent.objects.filter(user_id=user, active=True)
        if len(rent)==0:
            return False
        rent = rent[0]
        duration,cost,time=RentSerializer.updateRentValues(rent)
        cursor = connection.cursor()
        cursor.execute('''UPDATE bisi.rents_rent SET duration = %s,cost = %s WHERE id = %s''',[duration, cost, rent.id])
        transaction.commit()
        rent = Rent.objects.filter(user_id=user, active=True)[0]

        return rent
    
    def returnBike(user,return_slot):
        rent = RentSerializer.getCurrentRent(user)
        check_slot=Rent.objects.raw('''SELECT * FROM bisi.slots_slot WHERE id = %s''',[return_slot])
        if rent == False:
            return {'data': "You don't have a bike rented"}
        if len(check_slot) == 0:
            return {'data': "Slot not found"}
        slot = Rent.objects.raw('''SELECT * FROM bisi.slots_slot WHERE bike_id IS NULL AND id = %s''',[return_slot])
        if len(slot) == 0:
            return {'data': "This slot is already occupied"}
        duration,cost,return_time=RentSerializer.updateRentValues(rent)
        cursor = connection.cursor()
        cursor.execute('''UPDATE bisi.rents_rent SET duration = %s, cost = %s, returned_at = %s, active = %s, ending_slot_id = %s WHERE id = %s''',[duration, cost, return_time, False, return_slot, rent.id])
        cursor.execute('''UPDATE bisi.slots_slot SET bike_id = %s WHERE id = %s''',[rent.bike.id,return_slot])
        cursor.execute('''UPDATE bisi.users_user SET balance = balance - %s WHERE id = %s''',[cost, user])
        transaction.commit()
        return {'data': "Bike returned"}

    def updateRentValues(rent):
        current_time=datetime.now(timezone.utc)
        duration=current_time-rent.created_at
        duration_m=math.trunc(duration.total_seconds() / 60)
        cost=math.trunc(math.ceil(duration_m/30))*0.5
        return duration_m,cost,current_time


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