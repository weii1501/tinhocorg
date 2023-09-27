from django.contrib import admin
from .models import Comment


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass
# Register your models here.

# @admin.register(CommentThead)
# class CommentTheadAdmin(admin.ModelAdmin):
#     pass
