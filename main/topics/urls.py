from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_topic, name='topic-list-create'),
    path('<slug:topic_slug>/', views.detail_topic, name='topic-detail'),
    path('all-topics', views.list_all_topics, name='topic-list-all'),
    # Other user-related URLs for the app
]
