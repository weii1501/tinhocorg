from django.contrib import admin
from .models import Category
from topics.models import Topic


class Subcategory(admin.StackedInline):
    class Meta:
        verbose_name = 'Subcategories'
        verbose_name_plural = 'Subcategories'

    model = Category
    extra = 0


class Topics(admin.StackedInline):
    model = Topic
    extra = 0


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    inlines = [Subcategory, Topics]
# Register your models here.
