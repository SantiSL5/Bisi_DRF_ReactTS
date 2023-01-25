from django.db import models
from django.utils.text import slugify
from bisi.apps.core.models import TimestampedModel
from django.core.validators import RegexValidator
# Create your models here.

class Station(TimestampedModel):
    slug = models.SlugField(db_index=True, unique=True, max_length=255, editable=False)
    name = models.CharField(max_length=255)
    warning = models.BooleanField(default=False)
    disabled = models.BooleanField(default=False)
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name, allow_unicode=True)
        super().save(*args, **kwargs)

    class Meta:
        # Gives the proper plural name for admin
        verbose_name_plural = "Stations"
    
    def __str__(self):
        return self.slug