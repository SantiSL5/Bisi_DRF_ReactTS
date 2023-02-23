from rest_framework.generics import get_object_or_404
from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import Notification
from django.db import connection, transaction

class NotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
        fields = (
            'id',
            'user',
            'message',
            'active'
        )

    def to_notification(instance):
        return {
            'id': instance.id,
            'user': None if instance.user == None else instance.user.id,
            'message': instance.message,
            'active': instance.active
        }
    
    def slotWarning(slot):
        cursor = connection.cursor()
        cursor.execute('''UPDATE bisi.slots_slot SET warning = true where id = %s''',[slot])
        transaction.commit()
    
    def getAllNotifications(context):

        notifications = Notification.objects.all()
        serialized_notifications= []
        for notification in notifications.iterator():
            serialized_notification=NotificationSerializer.to_notification(notification)
            serialized_notifications.append(serialized_notification)

        return serialized_notifications
    
    def getNotificationsDelete(context):

        notifications = Notification.objects.filter(id__in=context['ids'])
        serialized_notifications= []
        for notification in notifications.iterator():
            serialized_notification=NotificationSerializer.to_notification(notification)
            serialized_notifications.append(serialized_notification)

        return notifications,serialized_notifications
    
    def getNotificationById(id):
        if id != None:
            notification = get_object_or_404(Notification.objects.all(), id=id)
            serialized_notification = NotificationSerializer.to_notification(notification)
            return serialized_notification
        
        return None
    
    def getAdminNotifications(user):

        notifications = Notification.objects.filter(user_id=None, active=True)
        serialized_notifications= []
        for notification in notifications.iterator():
            serialized_notification=NotificationSerializer.to_notification(notification)
            serialized_notifications.append(serialized_notification)

        return serialized_notifications
    
    def readNotification(user,notification):
        check_notification=Notification.objects.raw('''SELECT * FROM bisi.notifications_notification WHERE id = %s''',[notification])
        if len(check_notification) == 0:
            return {'data': "Notification not found"}
        elif check_notification[0].user_id != user:
            return {'data': "This notification is not yours"}
        cursor = connection.cursor()
        cursor.execute('''UPDATE bisi.notifications_notification SET active = false WHERE id = %s''',[notification])
        transaction.commit()
        return {'data': "Notification read"}
    
    def getUserNotifications(user):

        notifications = Notification.objects.filter(user_id=user, active=True)
        serialized_notifications= []
        for notification in notifications.iterator():
            serialized_notification=NotificationSerializer.to_notification(notification)
            serialized_notifications.append(serialized_notification)

        return serialized_notifications
    
    def readNotificationAdmin(user,notification):
        check_notification=Notification.objects.raw('''SELECT * FROM bisi.notifications_notification WHERE id = %s''',[notification])
        if len(check_notification) == 0:
            return {'data': "Notification not found"}
        elif check_notification[0].user_id != None:
            return {'data': "This notification is not for admins"}
        cursor = connection.cursor()
        cursor.execute('''UPDATE bisi.notifications_notification SET active = false WHERE id = %s''',[notification])
        transaction.commit()
        return {'data': "Notification read"}
    
    
    
    
    