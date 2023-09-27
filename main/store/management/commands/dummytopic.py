from django.core.management.base import BaseCommand
from catergories.models import Category
from topics.models import Topic
from users.models import CustomUser

class Command(BaseCommand):
    help = 'Create dummy data for Category model'
    
    
    def handle(self, *args, **options):
        dummydata=[
            {
    "name": "Input devices",
    "topics": [
        {
            "name": "Keyboard",
            "topics": [
                {
                    "name": "Mechanical Keyboards",
                    "topics": []
                },
                {
                    "name": "Membrane Keyboards",
                    "topics": []
                }
            ]
        },
        {
            "name": "Mouse",
            "topics": [
                {
                    "name": "Wired Mouse",
                    "topics": []
                },
                {
                    "name": "Wireless Mouse",
                    "topics": []
                }
            ]
        },
        {
            "name": "Touchscreen",
            "topics": [
                {
                    "name": "Capacitive Touchscreens",
                    "topics": []
                },
                {
                    "name": "Resistive Touchscreens",
                    "topics": []
                }
            ]
        }
    ]
},
            {
                "name": "Central Processing Unit - CPU",
                "topics": [
                {
                    "name": "CPU Architecture"
                },
                {
                    "name": "Cache Memory"
                },
                {
                    "name": "Processing Speed"
                },
                {
                    "name": "CPU Cores"
                },
                {
                    "name": "Manufacturing Technology"
                },
                {
                    "name": "Pipelining"
                },
                {
                    "name": "Control Unit"
                },
                {
                    "name": "CPU Interface"
                },
                {
                    "name": "Power and Performance"
                }
                ]
            },
            {
                "name": "Memory",
                "topics": [
                {
                    "name": "RAM - Random Access Memory"
                },
                {
                    "name": "ROM - Read-Only Memory"
                },
                {
                    "name": "Cache Memory"
                },
                {
                    "name": "Flash Memory"
                },
                {
                    "name": "EEPROM - Electrically Erasable Programmable Read-Only Memory"
                },
                {
                    "name": "CPU Cache"
                }
                ]
            },
            {
    "name": "Output devices",
    "topics": [
        {
            "name": "Display",
            "topics": [
                {
                    "name": "LCD",
                    "topics": []
                },
                {
                    "name": "LED",
                    "topics": []
                }
            ]
        },
        {
            "name": "Printer",
            "topics": [
                {
                    "name": "Inkjet Printer",
                    "topics": []
                },
                {
                    "name": "Laser Printer",
                    "topics": []
                }
            ]
        },
        {
            "name": "Audio",
            "topics": [
                {
                    "name": "Speakers",
                    "topics": []
                },
                {
                    "name": "Headphones",
                    "topics": []
                }
            ]
        }
    ]
},
            {
                "name": "Storage",
                "topics": [
                {
                    "name": "Hard drive"
                },
                {
                    "name": "Solid State Drive"
                },
                {
                    "name": "Hard Disk Drive"
                },
                {
                    "name": "USB flash drive"
                },
                {
                    "name": "Memory card"
                },
                {
                    "name": "Optical drive"
                }
                ]
            },
            {
                "name": "Graphics Card",
                "topics": [
                {
                    "name": "GPU - Graphics Processing Unit"
                },
                {
                    "name": "VRAM - Video RAM"
                },
                {
                    "name": "CUDA / OpenCL"
                },
                {
                    "name": "Display Outputs"
                },
                {
                    "name": "Cooling and Heat Management"
                },
                {
                    "name": "Overclocking"
                },
                {
                    "name": "DirectX / OpenGL / Vulkan"
                }
                ]
            },
            {
                "name": "Motherboard",
                "topics": [
                {
                    "name": "Basic knowledge about the motherboard"
                },
                {
                    "name": "Types of motherboards"
                },
                {
                    "name": "Connection standards"
                },
                {
                    "name": "BIOS and UEFI"
                },
                {
                    "name": "Overclocking"
                },
                {
                    "name": "Compatibility"
                },
                {
                    "name": "Maintenance and repairs"
                },
                {
                    "name": "Emerging technologies"
                }
                ]
            },
            {
                "name": "Power Supply",
                "topics": [
                {
                    "name": "Power Supply Types"
                },
                {
                    "name": "Wattage"
                },
                {
                    "name": "Efficiency"
                },
                {
                    "name": "Connection Standards"
                },
                {
                    "name": "Protection and Synchronization"
                },
                {
                    "name": "Cooling Fans"
                },
                {
                    "name": "Modular vs Non-modular Power Supply"
                },
                {
                    "name": "Markings and Certifications"
                },
                {
                    "name": "Compatibility and Installation"
                }
                ]
            },
            {
                "name": "Connectivity Devices",
                "topics": [
                {
                    "name": "Router"
                },
                {
                    "name": "Switch"
                },
                {
                    "name": "Access Point"
                },
                {
                    "name": "Modem"
                },
                {
                    "name": "Bridge"
                },
                {
                    "name": "Network Interface Card - NIC"
                },
                {
                    "name": "Network Cable"
                },
                {
                    "name": "Wireless Network Adapter"
                }
                ]
            }
            ]
            
        for category_data in dummydata:
            category_name = category_data["name"]
            category_topics = category_data["topics"]

            try:
                category = Category.objects.filter(name=category_name).first()
            except Category.DoesNotExist:
                # Handle the case when the category does not exist
                continue

            for topic_data in category_topics:
                topic_name = topic_data["name"]

                Topic.objects.create(
                    category=category,
                    user=CustomUser.objects.get(id=1),
                    title=topic_name
                )

        self.stdout.write(self.style.SUCCESS('Dummy data for Category created successfully.'))
