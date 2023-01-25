from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import Bike

class BikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bike
        fields = (
            'number', 
            'warning', 
            'disabled'
        )

    def to_bike(instance):
        return {
            'number' : instance.number,
            'warning' : instance.warning,
            'disabled' : instance.disabled
        }

    def getAllBikes(context):

        bikes = Bike.objects.all()
        serialized_bikes= []
        for bike in bikes.iterator():
            serialized_bike=BikeSerializer.to_bike(bike)
            serialized_bikes.append(serialized_bike)

        return serialized_bikes