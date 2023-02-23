from django.urls import path
from .view import NotificationUserView, NotificationView

urlpatterns = [
    #CRUD
    path('', NotificationView.as_view({'get':'getAllNotifications', 'post': 'createNotification'})),
    path('deleteMany/', NotificationView.as_view({'post': 'deleteNotifications'})),
    path('<int:id>', NotificationView.as_view({'put': 'updateNotification', 'delete': 'deleteNotification'})),
    path('admin/', NotificationView.as_view({'get':'getAdminNotifications','put': 'readNotification'})),
    #User authenticated
    path('user/', NotificationUserView.as_view({'get':'getUserNotifications','post': 'createNotification', 'put': 'readNotification'})),
]
