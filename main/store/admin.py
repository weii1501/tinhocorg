from django.contrib import admin

# Register your models StaticPag.
from .models import StaticPage

@admin.register(StaticPage)
class StaticPageAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'created_at')
    list_filter = ('title', 'slug', 'created_at')
    search_fields = ('title', 'slug', 'created_at')
    readonly_fields = ('created_at',)
