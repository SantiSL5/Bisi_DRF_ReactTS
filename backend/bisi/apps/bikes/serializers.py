from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import Bike

class bikeSerializer(serializers.ModelSerializer):

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


    def createBike(self, request):
        
        number = self.context['number']
        warning = self.context['warning']
        disabled = self.context['disabled']

        bike = Bike.objects.create(
            number = number,
            warning = warning,
            disabled = disabled,
        )

        return bike


    def getAllBikes(context):

        bikes = Bike.objects.all()
        serialized_bikes= []
        for bike in bikes.iterator():
            serialized_bike=bikeSerializer.to_bike(bike)
            serialized_bikes.append(serialized_bike)

        return serialized_bikes