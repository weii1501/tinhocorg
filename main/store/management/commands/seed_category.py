from django.core.management import BaseCommand
from faker import Faker

from catergories.models import Category


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('params', nargs=1, type=str)

    def handle(self, *args, **options):
        input_file = options['params'][0]
        data = []
        with open(input_file, 'r') as f:
            for line in f:
                print(line.strip())
                data.append(line.strip())
        f.close()
        for line in data:
            attrs = line.split('|')
            print(attrs)
            category = Category.objects.create(
                name=attrs[0],
                name_vi=attrs[1],
                description=attrs[2],
            )

            print(category)

