from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_list_category_api_view, name='category-list'),
    # path('<slug:category_slug>/', views.category_detail, name='cate-detail'),
    path('detail/', views.category_detail, name='category-detail'),
    # get all categories
    path('list/', views.list_category_topic, name='category-list-api'),
    # get all topics of categories
    path('list-topic/', views.list_topics_of_categories, name='category-list-topic-api'),
    # sitemap build
    path('sitemap/', views.sitemap, name='sitemap'),
]
