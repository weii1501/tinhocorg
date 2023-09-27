from django.core.management.base import BaseCommand
from catergories.models import Category
from topics.models import Topic
from users.models import CustomUser

class Command(BaseCommand):
    help = 'Create dummy data for Category model'
    
    
    def handle(self, *args, **options):
        network_topics = [
            {
                "title": "Introduction to Computer Networks",
                "slug": "introduction-to-computer-networks"
            },
            {
                "title": "TCP/IP Protocol Suite",
                "slug": "tcp-ip-protocol-suite"
            },
            {
                "title": "Network Topologies",
                "slug": "network-topologies"
            },
            {
                "title": "Routing and Switching",
                "slug": "routing-and-switching"
            },
            {
                "title": "Network Security",
                "slug": "network-security"
            },
            {
                "title": "Wireless Networks",
                "slug": "wireless-networks"
            },
            {
                "title": "Network Troubleshooting",
                "slug": "network-troubleshooting"
            },
            # Add more topics as needed
        ]
            
        for category_data in network_topics:
            category_topics = category_data

            try:
                category = Category.objects.get(name="Network")
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
