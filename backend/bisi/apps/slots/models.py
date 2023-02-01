from django.db import models
from bisi.apps.core.models import TimestampedModel

class Slot(TimestampedModel):
    number = models.IntegerField(db_index=True)
    station = models.ForeignKey('stations.Station', on_delete=models.CASCADE, related_name='stations')
    bike = models.OneToOneField('bikes.Bike', on_delete=models.SET_NULL, related_name='bikes', null=True)
    warning = models.BooleanField(default=False)
    disabled = models.BooleanField(default=False)

    class Meta:
        # Gives the proper plural name for admin
        verbose_name_plural = "Slots"

    def __str__(self):
        return str(self.number)