from rest_framework.generics import get_object_or_404
from django.template import context
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.exceptions import NotFound
from rest_framework import status
from .models import User
from .serializers import userSerializer
from rest_framework.permissions import (
    AllowAny, IsAuthenticated)


class UserView(viewsets.GenericViewSet):
    permission_classes = [AllowAny]

    def register(self, request):
        data = request.data

        if data['email'] is None:
            raise NotFound("Email is required!")

        if data['password'] is None:
            raise NotFound("Password is required!")

        if data['username'] is None:
            raise NotFound("Username is required!")

        serializer_context = {
            'email': data['email'],
            'password': data['password'],
            'username': data['username']
        }

        serializer = userSerializer.register(serializer_context)
        return Response(serializer)

    def login(self, request):
        data = request.data

        if data['password'] is None:
            raise NotFound("Password is required!")

        if data['email'] is None:
            raise NotFound("Email is required!")

        serializer_context = {
            'email': data['email'],
            'password': data['password']
        }
        serializer = userSerializer.login(serializer_context)
        return Response(serializer)

class UserAuthenticatedView(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = userSerializer

    def getUser(self, request):
                
        user = request.user
        serializer_context = {
            'user': user
        }
        serializer = userSerializer.getUser(context=serializer_context)
        return Response(serializer)

    def addFunds(self, request):
                
        user = request.user
        serializer_context = {
            'user': user,
            'funds': request.data['funds']
        }
        serializer = userSerializer.addFunds(context=serializer_context)
        return Response(serializer)

    # def refreshToken(self, request):
    #     username = request.user

    #     serializer_context = {
    #         'username': username
    #     }

    #     serializer = userSerializer.refreshToken(serializer_context)
    #     return Response(serializer)
    
    def getAllUsers(self,request):
        serializer = userSerializer.getAllUsers(context)
        return Response(serializer,status=status.HTTP_200_OK)

    def createUser(self, request):

        user = User.objects.create_user(
            email=request.data['email'],
            username=request.data['username'], 
            password=request.data['password'],
            balance=request.data['balance'],
            img=request.data['img'],
        )
        
        serialized_data = {
            'id': user.id,
            'email': user.email,
            'username': user.username, 
            'balance': user.balance,
            'img': user.img,
            'type': user.type,
        }

        return Response(serialized_data, status=status.HTTP_200_OK)

    def updateUser(self, request, id):
                
        user = get_object_or_404(User.objects.all(), id=id)
        data = request.data
        
        if not (data.get("password") is None):
            user.set_password(data["password"])
            data["password"] = user.password

        serializer = userSerializer(
            instance=user, data=data, partial=True)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
        return Response(userSerializer.to_user(user))

    def deleteUser(self, request, id):
        user = get_object_or_404(User.objects.all(),id=id)
        user.delete()
        return Response({'data': 'User deleted'})

    def deleteUsers(self, request):
        serializer_context = {
            'ids': request.data['ids'],
            'request': request
        }

        if len(serializer_context['ids']) > 0:
            users,serializer = userSerializer.getUsersDelete(serializer_context)
            if len(serializer) != len(serializer_context['ids']):
                return Response({'data': "Some users doesn't exist"})
            users.delete()
            return Response({'data': 'Users deleted'})
        return Response({'data': 'No users provided'})

