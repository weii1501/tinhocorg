from django.urls import path
from . import views

urlpatterns = [
    path('topic/<slug:topic_slug>/', views.list_articles, name='user-list'),
    path('lastest/', views.get_lastest, name='articles-list-lastest'),
    path('create/', views.post_article, name='article-create'),
    path('<int:thread_id>/', views.get_detail, name='article-detail'),
    # Other user-related URLs for the app
    # like article
    path('like/', views.like_article, name='article-like'),
    # get all article
    path('list/', views.get_all, name='article-list'),
    # get all article last upload
    path('last-upload/', views.GetArticlesLastUploadAPIView.as_view(), name='article-list-lastest-upload'),
]
