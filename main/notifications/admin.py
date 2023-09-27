from django.contrib import admin
from .models import Notification


@admin.register(Notification)
class ReplyAdmin(admin.ModelAdmin):
    pass
# Register your models here.
