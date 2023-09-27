from sys import stdout

from django.core.management.base import BaseCommand
from faker import Faker

from catergories.models import Category
from topics.models import Topic


class Command(BaseCommand):
    def handle(self, *args, **options):
        faker = Faker()
        stdout.write("creating....\n")
        topics = Topic.objects.all()
        for topic in topics:
            if topic.description is None:
                topic.description = faker.text()
                topic.save()

            if topic.description == '':
                topic.description = faker.text()
                topic.save()

            print(f"{topic.title}: done")

        stdout.write("\n Done....\n")

        catergories = Category.objects.all()
        for catergory in catergories:
            if catergory.description is None:
                catergory.description = faker.text()
                catergory.save()

            if catergory.description == '':
                catergory.description = faker.text()
                catergory.save()

            print(f"{catergory.name}: done")