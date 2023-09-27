import random

from django.core.management.base import BaseCommand

from articles.models import Articles
from catergories.models import Category
from tags.models import Tag
from threads.models import Thread
from topics.models import Topic

tagsStr = 'technology #blockchaintechnology #neoculturetechnology #informationtechnology #bitcointechnology #newtechnology #biotechnology #technologynews #nanotechnology #technologyrocks #instatechnology #technologythesedays #futuretechnology #smarthometechnology #dentaltechnology #artechnology #womenintechnology #smarttechnology #scienceandtechnology #beautyoftechnology #fashioninstituteoftechnology #artandtechnology #foodtechnology #technologysolutions #fashiontechnology #wearabletechnology #total_technology #technologyblog #medicaltechnology #massachusettsinstituteoftechnology #moderntechnology #injentechnology #creativetechnology #musictechnology #technologytrends #technologylover #latesttechnology #primitivetechnology #greentechnology #assistivetechnology'

class Command(BaseCommand):
    help = 'Create dummy data for tag model'

    def handle(self, *args, **options):
        tags = tagsStr.split(' #')
        for tag in tags:
            print(tag)
            Tag.objects.create(name=tag)
        print('done')
        # tags = Tag.objects.all()
        # topics = Topic.objects.all()
        # for topic in topics:
        #     topic.cover = 'article_images/img.png'
        #     topic.save()
        articles = Articles.objects.all()
        for article in articles:
            # random_tags = random.sample(list(tags), 3)
            article.cover = None
            article.status = 'P'
            # article.tags.set(random_tags)
            article.save()
        threads = Thread.objects.all()
        for thread in threads:
            # random_tags = random.sample(list(tags), 3)
            # thread.tags.set(random_tags)
            thread.status = 'P'
            thread.cover = None
            thread.save()
        # categories = Category.objects.all()
        #
        # for category in categories:
        #     category.cover = 'article_images/img.png'
        #     category.save()

        articles = Articles.objects.all()
        for article in articles:
            article.num_views = 100000000
            article.save()