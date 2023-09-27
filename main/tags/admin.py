from django.contrib import admin

# Register your models here.
from .models import Tag

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    list_filter = ('name', 'slug', 'created_at')
    search_fields = ('name', 'slug', 'created_at')
    readonly_fields = ('created_at',)
