from django.core.management.base import BaseCommand

from catergories.models import Category


class Command(BaseCommand):
    def handle(self, *args, **options):
        categories = Category.objects.all()
        for category in categories:
            if category.name_vi == None:
                category.name_vi = 'Đang cập nhật'
                category.save()