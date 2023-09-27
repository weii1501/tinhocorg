from random import randrange
from sys import stdout
import random

from django.core.management import BaseCommand, call_command
from faker import Faker

from users.models import CustomUser
from threads.models import Thread
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
                thread = Thread.objects.create(
                    title=faker.sentence(),
                    topic=list(topics)[i],
                    publish=True,
                    content=faker.text(),
                    status='P',
                    user=user
                )
                stdout.write(f"\n {thread.title}\n")
                random_tags = random.sample(list(tags), 2)
                thread.tags.add(*random_tags)
                thread.save()

        stdout.write("\n Done....\n")

