from django.apps import AppConfig


class UserConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'bisi.apps.users'
    # name = 'bisi.apps.users.signals'

    def ready(self):
            import bisi.apps.users.signals
