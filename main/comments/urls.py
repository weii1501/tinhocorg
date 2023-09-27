from django.urls import path
from . import views

urlpatterns = [
    # path('', views.reply_list, name='reply-list-create'),
    # danh sach coment
    path('<int:article_id>', views.reply_list_by_article, name='reply-list-article'),
    # them comment
    path('add-comment/', views.post_comment, name='comment-add'),
    #  danh sach article vaf thread
    path('', views.reply_list_article, name='reply-list-article'),
    
    # Other user-related URLs for the app
]
