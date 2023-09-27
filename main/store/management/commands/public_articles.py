from django.core.management import BaseCommand
from articles.models import Articles

class Command(BaseCommand):
    def handle(self, *args, **options):
        articles = Articles.objects.all()
        for article in articles:
            article.status = 'P'
            article.save()
