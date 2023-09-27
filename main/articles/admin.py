from django.contrib import admin
from .models import Articles
from comments.models import Comment


class Replies(admin.StackedInline):
    model = Comment
    extra = 0


@admin.register(Articles)
class ArticlesAdmin(admin.ModelAdmin):
    inlines = [Replies]
    autocomplete_fields = ['tags']

# Register your models here.
