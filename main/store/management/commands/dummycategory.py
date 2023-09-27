from django.core.management.base import BaseCommand
from catergories.models import Category
from topics.models import Topic
from users.models import CustomUser

class Command(BaseCommand):
    help = 'Create dummy data for Category model'

    def handle(self, *args, **options):
        # Create the Hardware category
        hardware_category = Category.objects.create(name="Hardware")

        # Create subcategories for Hardware
        input_devices_category = Category.objects.create(name="Input devices", parent=hardware_category)
        output_devices_category = Category.objects.create(name="Output devices", parent=hardware_category)
        cpu_category = Category.objects.create(name="Central Processing Unit - CPU", parent=hardware_category)
        memory_category = Category.objects.create(name="Memory", parent=hardware_category)
        storage_category = Category.objects.create(name="Storage", parent=hardware_category)
        graphics_card_category = Category.objects.create(name="Graphics Card", parent=hardware_category)
        motherboard_category = Category.objects.create(name="Motherboard", parent=hardware_category)
        power_supply_category = Category.objects.create(name="Power Supply", parent=hardware_category)
        connectivity_devices_category = Category.objects.create(name="Connectivity Devices", parent=hardware_category)

        # Create topics for each subcategory
        topics_data = [
            # Input devices subcategory
            {
                "category": input_devices_category,
                "topics": [
                    "Keyboard",
                    "Mouse",
                    "Stylus",
                    "Scanner",
                    "Fingerprint scanner",
                    "Camera",
                    "Microphone",
                    # ...
                ]
            },
            # Output devices subcategory
            {
                "category": output_devices_category,
                "topics": [
                    "Monitor",
                    "Print",
                    "Speaker",
                    "Headphones",
                    "Projector",
                    # ...
                ]
            },
            # Central Processing Unit - CPU subcategory
            {
                "category": cpu_category,
                "topics": [
                    "CPU Architecture",
                    "Cache Memory",
                    "Processing Speed",
                    "CPU Cores",
                    "Manufacturing Technology",
                    "Pipelining",
                    "Control Unit",
                    "CPU Interface",
                    "Power and Performance",
                    # ...
                ]
            },
            # Memory subcategory
            {
                "category": memory_category,
                "topics": [
                    "RAM - Random Access Memory",
                    "ROM - Read-Only Memory",
                    "Cache Memory",
                    "Flash Memory",
                    "EEPROM - Electrically Erasable Programmable Read-Only Memory",
                    "CPU Cache",
                    # ...
                ]
            },
            # Storage subcategory
            {
                "category": storage_category,
                "topics": [
                    "Hard drive",
                    "Solid State Drive",
                    "Hard Disk Drive",
                    "USB flash drive",
                    "Memory card",
                    "Optical drive",
                    # ...
                ]
            },
            # Graphics Card subcategory
            {
                "category": graphics_card_category,
                "topics": [
                    "GPU - Graphics Processing Unit",
                    "VRAM - Video RAM",
                    "CUDA / OpenCL",
                    "Display Outputs",
                    "Cooling and Heat Management",
                    "Overclocking",
                    "DirectX / OpenGL / Vulkan",
                    # ...
                ]
            },
            # Motherboard subcategory
            {
                "category": motherboard_category,
                "topics": [
                    "Basic knowledge about the motherboard",
                    "Types of motherboards",
                    "Connection standards",
                    "BIOS and UEFI",
                    "Overclocking",
                    "Compatibility",
                    "Maintenance and repairs",
                    "Emerging technologies",
                    # ...
                ]
            },
            # Power Supply subcategory
            {
                "category": power_supply_category,
                "topics": [
                    "Power Supply Types",
                    "Wattage",
                    "Efficiency",
                    "Connection Standards",
                    "Protection and Synchronization",
                    "Cooling Fans",
                    "Modular vs Non-modular Power Supply",
                    "Markings and Certifications",
                    "Compatibility and Installation",
                    # ...
                ]
            },
            # Connectivity Devices subcategory
            {
                "category": connectivity_devices_category,
                "topics": [
                    "Router",
                    "Switch",
                    "Access Point",
                    "Modem",
                    "Bridge",
                    "Network Interface Card - NIC",
                    "Network Cable",
                    "Wireless Network Adapter",
                    # ...
                ]
            }
        ]

        # Create topics for each subcategory
        for topic_data in topics_data:
            category = topic_data["category"]
            topics = topic_data["topics"]

            for topic_name in topics:
                Topic.objects.create(
                    category=category,
                    user=CustomUser.objects.get(username='admin'),
                    title=topic_name
                )

        self.stdout.write(self.style.SUCCESS('Dummy data for Category created successfully.'))
