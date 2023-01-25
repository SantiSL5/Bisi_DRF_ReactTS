from django.apps import AppConfig

class StationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'bisi.apps.stations'

    def ready(self):
        import bisi.apps.stations.signals
