from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import Station

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

    def getAllStations(context):

        stations = Station.objects.all()
        serialized_stations= []
        for station in stations.iterator():
            serialized_station=StationSerializer.to_station(station)
            serialized_stations.append(serialized_station)

        return serialized_stations