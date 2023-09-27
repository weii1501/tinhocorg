from django.urls import path
from . import views

urlpatterns = [
    # path('', views.reply_list, name='reply-list-create'),
    path('<int:thread_id>/', views.reply_list_by_thread, name='reply-list-thread'),
    path('add-reply/', views.post_reply, name='reply-add'),
    
    # Other user-related URLs for the app
    # api giai quyet cau hoi
    path('solve-reply/', views.solve_reply, name='solve-reply'),
    # api tinh diem cho cau tra loi
    path('vote-reply/', views.point_reply, name='point-reply'),
]
