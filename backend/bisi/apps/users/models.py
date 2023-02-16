import jwt

from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager)
# from django.contrib.auth.base_user import AbstractBaseUser
from bisi.apps.core.models import TimestampedModel
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, username, email, password):
        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )
        user.type="client"
        user.is_active=True
        user.balance=0
        user.img="https://static.productionready.io/images/smiley-cyrus.jpg"
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password):
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            type='admin'
        )
        user.is_superuser = True
        user.set_password(password)
        user.save()
        return user

class User(AbstractBaseUser, TimestampedModel):
    uuid = models.CharField('uuid', max_length=36, unique=True, editable=False)
    email = models.EmailField('email', unique=True)
    username = models.CharField('username', max_length=30, blank=True)
    is_active = models.BooleanField('active', default=True)
    balance = models.FloatField('balance', default=True)
    img = models.CharField(max_length=255)
    type = models.CharField('type', max_length=10, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def __str__(self):
        return self.username
    
    @property
    def token(self):
        return self.generate_token_jwt()
    
    def generate_token_jwt(self):
        dt = datetime.now() + timedelta(minutes=60)

        token = jwt.encode({
            'email': self.email,
            'exp': int(dt.strftime('%s'))
        }, settings.SECRET_KEY, algorithm='HS256')
        return token.decode('utf-8')



