from random import randrange
from sys import stdout
import random

from django.core.management import BaseCommand, call_command
from faker import Faker

from users.models import CustomUser
from articles.models import Articles
from topics.models import Topic
from tags.models import Tag


class Command(BaseCommand):
    def handle(self, *args, **options):
        faker = Faker()
        stdout.write("creating....\n")
        topics = Topic.objects.all()
        user = CustomUser.objects.filter(username='admin').first()
        tags = Tag.objects.all()

        for _ in range(randrange(1, 30)):
            for i in range(len(topics)):
                article = Articles.objects.create(
                    title=faker.sentence(),
                    article_description=faker.text(),
                    topic=list(topics)[i],
                    publish=True,
                    content=faker.text(),
                    user=user,
                    status='P'
                )

                random_tags = random.sample(list(tags), 2)
                article.tags.add(*random_tags)
                article.save()

