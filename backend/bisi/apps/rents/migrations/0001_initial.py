# Generated by Django 4.1.5 on 2023-02-20 17:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('slots', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bikes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Rent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('duration', models.IntegerField(default=0, null=True)),
                ('active', models.BooleanField(default=True)),
                ('cost', models.FloatField(default=0, null=True)),
                ('returned_at', models.DateTimeField(null=True)),
                ('bike', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bike_rent', to='bikes.bike')),
                ('ending_slot', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='e_slot', to='slots.slot')),
                ('starting_slot', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='s_slot', to='slots.slot')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='stations', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Rents',
            },
        ),
    ]
