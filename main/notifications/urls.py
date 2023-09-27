from django.urls import path

from . import views


urlpatterns = [
    path("get-all/", views.get_all_noti, name="index"),
    path('put-read/<int:id>/', views.put_read, name='post-read'),
    # add notification
    path('add-notification/', views.add_notification, name='add-notification'),
]
