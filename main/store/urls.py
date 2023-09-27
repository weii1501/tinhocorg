from django.urls import path

from . import views

urlpatterns = [
    path('', views.get_statics_page, name='store-list'),
]