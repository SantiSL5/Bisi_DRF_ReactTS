from rest_framework.generics import get_object_or_404
from django.template import context
from .serializers import NotificationSerializer
from ..slots.serializers import SlotSerializer
# from rest_framework.exceptions import NotFound
from rest_framework import generics, mixins, status, viewsets
from rest_framework.response import Response 
from .models import Notification
from ..slots.models import Slot
from rest_framework.permissions import (AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser,)

class NotificationView(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = NotificationSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    
    def getAllNotifications(self,request):
        serializer = NotificationSerializer.getAllNotifications(context)
        return Response(serializer,status=status.HTTP_200_OK)

    def createNotification(self, request):

        serializer_context = {
            'user': None,
            'message': request.data['message'],
            'active': True,
            'request': request
        }

        serializer = self.serializer_class(
            data = serializer_context,
            context = serializer_context
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


    def updateNotification(self, request, id):
        notification = get_object_or_404(Notification.objects.all(), id=id)
        data = request.data
                
        serializer = NotificationSerializer(
            instance=notification, data=data, partial=True)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
        return Response(NotificationSerializer.to_notification(notification))

    def deleteNotification(self, request, id):
        notification = get_object_or_404(Notification.objects.all(),id=id)
        notification.delete()
        return Response({'data': 'Notification deleted'})
    
    def deleteNotifications(self, request):
        serializer_context = {
            'ids': request.data['ids'],
            'request': request
        }

        if len(serializer_context['ids']) > 0:
            notifications,serializer = NotificationSerializer.getNotificationsDelete(serializer_context)
            if len(serializer) != len(serializer_context['ids']):
                return Response({'data': "Some notifications doesn't exist"})
            notifications.delete()
            return Response({'data': 'Notifications deleted'})
        return Response({'data': 'No incidences provided'})
    
    def getAdminNotifications(self, request):
        serializer = NotificationSerializer.getAdminNotifications(request.user.id)
        return Response(serializer,status=status.HTTP_200_OK)
    
    def readNotification(self, request):
        serializer = NotificationSerializer.readNotificationAdmin(request.user.id, request.data['notification'])
        return Response(serializer,status=status.HTTP_200_OK)

class NotificationUserView(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = NotificationSerializer
    http_method_names = ['get', 'post', 'put', 'delete']

    def createNotification(self, request):

        serializer_context = {
            'user': request.user.id,
            'message': request.data['message'],
            'active': True,
            'request': request
        }

        serializer = self.serializer_class(
            data = serializer_context,
            context = serializer_context
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def getUserNotifications(self, request):
        serializer = NotificationSerializer.getUserNotifications(request.user.id)
        return Response(serializer,status=status.HTTP_200_OK)
    
    def readNotification(self, request):
        serializer = NotificationSerializer.readNotification(request.user.id, request.data['notification'])
        return Response(serializer,status=status.HTTP_200_OK)