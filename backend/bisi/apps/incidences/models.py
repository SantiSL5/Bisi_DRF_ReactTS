from django.db import models
from bisi.apps.core.models import TimestampedModel

class Incidence(TimestampedModel):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='user', null=True)
    slot = models.ForeignKey('slots.Slot', on_delete=models.CASCADE, related_name='slot')
    message = models.TextField('message', max_length=280)
    state = models.CharField('state', max_length=40)

    class Meta:
        # Gives the proper plural name for admin
        verbose_name_plural = "Incidences"

    def __str__(self):
        return str(self.id)