from django.db import models
from bisi.apps.core.models import TimestampedModel

class Rent(TimestampedModel):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='stations')
    bike = models.ForeignKey('bikes.Bike', on_delete=models.CASCADE, related_name='bike_rent')
    starting_slot = models.ForeignKey('slots.Slot', on_delete=models.CASCADE, related_name='s_slot')
    ending_slot = models.ForeignKey('slots.Slot', on_delete=models.CASCADE, related_name='e_slot', null=True)
    duration = models.DurationField(null=True)
    active = models.BooleanField(default=True)
    returned_at = models.DateTimeField(null=True)

    class Meta:
        # Gives the proper plural name for admin
        verbose_name_plural = "Rents"

    def __str__(self):
        return str(self.id)