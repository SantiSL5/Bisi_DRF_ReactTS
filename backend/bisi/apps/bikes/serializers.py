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

    def updateBike(context):
        
        oldnumber = context['oldnumber']
        number = context['number']
        warning = context['warning']
        disabled = context['disabled']
        
        
        try:
            bike = Bike.objects.get(number=oldnumber)
            
            checkid = Bike.objects.get(number=number)
            
            if bike.id != checkid.id:
                return "Bike already exists"
                
            
        except:
            if bike:
                return("Bike doesn't exist")
                
            
            return("Bike doesn't exist")

        
        

        # if not bike.number:
        #     print ("adads")
        #     raise serializers.ValidationError(
        #         'Bike already exists.'
        #     )
            


        Bike.objects.filter(number=number).update(
            number = number,
            warning = warning,
            disabled = disabled,
        )
        
        bike = Bike.objects.get(number=number)
        
        return{
            'number': bike.number,
            'warning': bike.warning,
            'disabled': bike.disabled,
        }
