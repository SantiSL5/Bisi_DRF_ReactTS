from rest_framework.generics import get_object_or_404
from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import Bike

class BikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bike
        fields = (
            'id',
            'number',
        )

    def to_bike(instance):
        return {
            'id': instance.id,
            'number' : instance.number,
        }

    def getAllBikes(context):

        bikes = Bike.objects.all()
        serialized_bikes= []
        for bike in bikes.iterator():
            serialized_bike=BikeSerializer.to_bike(bike)
            serialized_bikes.append(serialized_bike)

        return serialized_bikes
    
    def getBikesDelete(context):

        bikes = Bike.objects.filter(id__in=context['ids'])
        serialized_bikes= []
        for bike in bikes.iterator():
            serialized_bike=BikeSerializer.to_bike(bike)
            serialized_bikes.append(serialized_bike)

        return bikes,serialized_bikes
    
    def getBikeById(id):
        if id != None:
            bike = get_object_or_404(Bike.objects.all(), id=id)
            serialized_bike = BikeSerializer.to_bike(bike)
            return serialized_bike
        
        return None
    
    
    