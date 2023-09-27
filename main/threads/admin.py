from django.contrib import admin
from .models import Thread
from replies.models import Reply

class Replies(admin.StackedInline):
    model= Reply
    extra=0
    
@admin.register(Thread)
class ThreadAdmin(admin.ModelAdmin):
    inlines=[Replies]
    autocomplete_fields = ['tags']
    

# Register your models here.
