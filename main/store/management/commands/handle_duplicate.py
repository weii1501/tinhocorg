from django.core.management.base import BaseCommand
from django.db.models import Count

from catergories.models import Category
from topics.models import Topic


class Command(BaseCommand):
    def handle(self, *args, **options):
        duplicate_topics = Topic.objects.values('slug').annotate(slug_count=Count('slug')).filter(slug_count__gt=1)
        # Duyệt qua các bản ghi trùng lặp và thay đổi slug
        for duplicate in duplicate_topics:
            topics_to_update = Topic.objects.filter(slug=duplicate['slug'])
            for i, topic in enumerate(topics_to_update):
                # Thay đổi giá trị slug sao cho nó là duy nhất
                new_slug = f"{topic.slug}-{i}"
                topic.slug = new_slug
                topic.save()

        # Thay đổi slug của các category
        duplicate_category = Category.objects.values('slug').annotate(slug_count=Count('slug')).filter(slug_count__gt=1)
        for duplicate in duplicate_category:
            categories_to_update = Category.objects.filter(slug=duplicate['slug'])
            for i, category in enumerate(categories_to_update):
                new_slug = f"{category.slug}-{i}"
                category.slug = new_slug
                category.save()