from django.core.management.base import BaseCommand
from catergories.models import Category
from topics.models import Topic
from users.models import CustomUser

class Command(BaseCommand):
    help = 'Create dummy data for Category model'
    
    
    def handle(self, *args, **options):
        dummy_topics = [
            {
                "title": "Introduction to Software",
                "slug": "introduction-to-software"
            },
            {
                "title": "Software Development Life Cycle",
                "slug": "software-development-life-cycle"
            },
            {
                "title": "Types of Software",
                "slug": "types-of-software"
            },
            {
                "title": "Operating Systems Overview",
                "slug": "operating-systems-overview"
            },
            {
                "id": 5,
                "title": "Introduction to Productivity Software",
                "created_at": "2023-07-28T14:00:00Z",
                "slug": "introduction-to-productivity-software"
            },
            {
                "title": "Software Testing Techniques",
                "slug": "software-testing-techniques"
            },
            {
                "title": "Mobile App Development",
                "slug": "mobile-app-development"
            },
            # Add more dummy topics as needed
        ]
            
        for category_data in dummy_topics:
            category_topics = category_data

            try:
                category = Category.objects.get(name="Software")
            except Category.DoesNotExist:
                # Handle the case when the category does not exist
                continue
            topic_name = category_data["title"]

            Topic.objects.create(
                category=category,
                user=CustomUser.objects.get(id=1),
                title=topic_name
            )

        self.stdout.write(self.style.SUCCESS('Dummy data for Category created successfully.'))
