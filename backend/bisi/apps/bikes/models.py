from django.db import models
from bisi.apps.core.models import TimestampedModel
# from django.core.validators import MaxValueValidator, MinValueValidator 

class Bike(TimestampedModel):
    # serial_number = models.CharField(max_length=255)
    number = models.IntegerField(db_index=True, unique=True)
    # battery = models.IntegerField(
    #     default=100,
    #     validators=[
    #         MaxValueValidator(100),
    #         MinValueValidator(0)
    #     ]
    # )
    # slot = models.ForeignKey('slots.Slot', on_delete=models.DO_NOTHING, related_name='slots', null=True)

    class Meta:
        # Gives the proper plural name for admin
        verbose_name_plural = "Bikes"

    def __str__(self):
        return str(self.number)