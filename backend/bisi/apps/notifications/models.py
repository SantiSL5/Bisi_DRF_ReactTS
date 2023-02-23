from django.db import models
from bisi.apps.core.models import TimestampedModel

class Notification(TimestampedModel):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='user_notificated', null=True)
    message = models.TextField('message', max_length=280)
    active = models.BooleanField('active')

    class Meta:
        # Gives the proper plural name for admin
        verbose_name_plural = "Notifications"

    def __str__(self):
        return str(self.id)