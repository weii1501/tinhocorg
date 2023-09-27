import random

from django.core.management.base import BaseCommand
from articles.models import Articles

from tags.models import Tag
from threads.models import Thread


class Command(BaseCommand):
    help = 'Create dummy data for tag model'

    def handle(self, *args, **options):
        articles = Articles.objects.all()
        threads = Thread.objects.all()
        tags = Tag.objects.all()
        for article in articles:
            random_tags = random.sample(list(tags), 2)
            article.tags.add(*random_tags)
            article.save()

        for thread in threads:
            random_tags = random.sample(list(tags), 2)
            thread.tags.add(*random_tags)
            thread.save()
