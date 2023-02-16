from rest_framework import serializers, authentication, exceptions
from django.core.exceptions import PermissionDenied
from .models import User


class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('password', 'email', 'username', 'types')

    def getUser(context):
        user = context['user']
        if user is None:
            raise serializers.ValidationError(
                'username is not find'
            )
        user = User.objects.get(email=user.email)

        return {
            'user': {
                'username': user.username,
                'email': user.email,
                'type': user.type,
                'balance': user.balance,
                'img': user.img
            },
        }

    def register(context):

        email = context['email']
        password = context['password']
        username = context['username']

        email_exist = len(User.objects.filter(email=email))
        if (email_exist > 0):
            raise serializers.ValidationError(
                'Email is already taken'
            )

        user = User.objects.create_user(
            email=email,
            username=username,
            password=password
        )
        return {
            'user': {
                'username': user.username,
                'email': user.email,
                'type': user.type
            },
            'token': user.token,
        }

    def login(context):
        email = context['email']
        password = context['password']
        if email is None:
            raise serializers.ValidationError(
                'An email is required to log in.'
            )

        if password is None:
            raise serializers.ValidationError(
                'A password is required to log in.'
            )

        try:
            user = User.objects.get(email=email)
            user.countTokens = 0
            user.save()
        except:
            raise serializers.ValidationError(
                'Email or password incorrects.'
            )

        if not user.check_password(password):
            raise serializers.ValidationError(
                'Email or password incorrects.'
            )

        return {
            'user': {
                'username': user.username,
                'email': user.email,
                'type': user.type
            },
            'token': user.token
        }

    # def refreshToken(context):

    #     username = context['username']

    #     user = User.objects.get(username=username)
    #     if (user.countTokens < 3):
    #         user.countTokens = user.countTokens + 1
    #         user.save()
    #     else:
    #         raise exceptions.AuthenticationFailed("error")

    #     return {
    #         'token': user.token
    #     }