from django.urls import path
from . import views

urlpatterns = [
    path('topic/<slug:topic_slug>/', views.list_threads, name='user-list'),
    path('lastest/', views.get_lastest, name='threads-list-lastest'),
    path('create/', views.post_thread, name='thread-create'),
    # chi tiet thread
    path('<int:thread_id>/', views.get_detail, name='thread-detail'),
    path('all/', views.list_all, name='thread-list-all'),
    path('approve/<int:thread_id>/', views.approve_thread, name='thread-approve'),
    path('update/<int:thread_id>/', views.update_thread, name='thread-delete'),
    # Other user-related URLs for the app
    # like thread
    path('like/', views.like_thread, name='thread-like'),
    # api test list all pagination
    path('list-all/', views.GetThreadListAPIView.as_view(), name='thread-list-all'),

    # api get all thread
    path('list/', views.get_all, name='thread-list'),
    # api get all thread last upload
    path('last-upload/', views.GetThreadsLastUploadAPIView.as_view(), name='thread-list-lastest-upload'),
]
