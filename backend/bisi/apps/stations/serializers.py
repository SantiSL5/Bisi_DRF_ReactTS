from rest_framework.generics import get_object_or_404
from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import Station
from ..bikes .serializers import BikeSerializer

class StationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Station
        fields = (
            'id',
            'slug', 
            'name', 
            'warning',
            'disabled'
        )

    def to_station(instance):
        return {
            'id': instance.id,
            'slug' : instance.slug, 
            'name' : instance.name, 
            'warning' : instance.warning,
            'disabled' : instance.disabled
        }
        
    def to_station_slots(instance,slots):
        
        return {
            'id': instance.id,
            'slug' : instance.slug, 
            'name' : instance.name, 
            'warning' : instance.warning,
            'disabled' : instance.disabled,
            'slots' : slots
        }

    def to_slot(instance):
        return {
            'id': instance.id,
            'number' : instance.number,
            'bike': instance.bike_id,
            'warning' : instance.warning,
            'disabled' : instance.disabled
        }

    def getAllStations(context):

        stations = Station.objects.all()
        serialized_stations= []
        for station in stations.iterator():
            serialized_station=StationSerializer.to_station(station)
            serialized_stations.append(serialized_station)

        return serialized_stations
    
    def getAllStationsWithSlots(context):
        
        stations = Station.objects.all()
        serialized_stations= []
        for station in stations.iterator():
            
            slots = Station.objects.raw('SELECT * FROM slots_slot slots WHERE station_id =' + str(station.id) )
            serialized_slots= []
            for slot in slots.iterator():
                serialized_slot=StationSerializer.to_slot(slot)
                serialized_slots.append(serialized_slot)

            serialized_station=StationSerializer.to_station_slots(station,serialized_slots)
            serialized_stations.append(serialized_station)

        return serialized_stations
    
    def getStationsDelete(context):

        stations = Station.objects.filter(id__in=context['ids'])
        serialized_stations= []
        for station in stations.iterator():
            serialized_station=StationSerializer.to_station(station)
            serialized_stations.append(serialized_station)

        return stations,serialized_stations
    
    def getStationsById(id):

        station = get_object_or_404(Station.objects.all(), id=id)
        serialized_station = StationSerializer.to_station(station)
        
        return serialized_station