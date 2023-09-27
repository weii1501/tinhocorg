from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_tags_list, name='tags-list'),
    # Other user-related URLs for the app
    path('<slug:tag_slug>/', views.get_articles_thread_tags, name='articles-list-tags'),
    # api lay top tags
    path('hot/get-top-tags/', views.ListTopTags.as_view(), name='top-tags'),
]