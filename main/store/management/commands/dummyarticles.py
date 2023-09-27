from django.core.management.base import BaseCommand
from catergories.models import Category
from topics.models import Topic
from users.models import CustomUser
from articles.models import Articles

class Command(BaseCommand):
    help = 'Create dummy data for Threads model'
    
    
    def handle(self, *args, **options):
        dummydata=[
  {
    "title": "The Ultimate Guide to Mechanical Keyboards",
    "content": "Learn about the different types of mechanical switches, their sound and feel, and how to choose the right one for you."
  },
  {
    "title": "10 Best Keyboards for Programmers in 2021",
    "content": "Discover the top keyboards for coding and programming based on features like ergonomic design, customizable keys, and more."
  },
  {
    "title": "How to Clean Your Keyboard: Tips and Tricks",
    "content": "Keep your keyboard in tip-top shape with these cleaning tips and practices to prevent damage and extend the lifespan of your device."
  },
  {
    "title": "The Pros and Cons of Wireless Keyboards",
    "content": "Explore the benefits and drawbacks of going wireless with your keyboard, including connectivity, battery life, and other considerations."
  },
  {
    "title": "Top 5 Keyboards for Gamers in 2021",
    "content": "Find the best gaming keyboard for your budget and needs, with features like RGB lighting, programmable macros, and more."
  },
  {
    "title": "Mechanical vs. Membrane Keyboards: Which Is Right for You?",
    "content": "Compare the differences between mechanical and membrane keyboards, including their pros and cons, to find the best fit for your usage."
  },
  {
    "title": "The Best Keyboards for Writers and Typists",
    "content": "Discover the top keyboards for writers and typists, with features like comfortable design, quiet keys, and more to improve productivity."
  },
  {
    "title": "How to Choose the Right Keyboard for Your Needs",
    "content": "Learn about the different types of keyboards available, including wired, wireless, and ergonomic options, to find the best fit for your use case."
  },
  {
    "title": "The Benefits of Using an Ergonomic Keyboard",
    "content": "Explore the advantages of using an ergonomic keyboard, including improved comfort and reduced strain on your hands and wrists."
  },
  {
    "title": "10 Keyboards with the Best RGB Lighting",
    "content": "Get the ultimate gaming setup with these keyboards featuring customizable RGB lighting, with options for different color schemes, effects, and more."
  },
  {
    "title": "The Best Keyboards for Mac Users",
    "content": "Find the top keyboards designed for Apple Mac users, with features like macOS compatibility, sleek design, and more."
  },
  {
    "title": "How to Fix Common Keyboard Problems",
    "content": "Solve common issues with your keyboard, such as stuck keys, unresponsive buttons, and more, with these troubleshooting tips."
  },
  {
    "title": "Top 5 Budget Keyboards for 2021",
    "content": "Get a great keyboard that won't break the bank with these top picks for budget-friendly options, including wired and wireless models."
  },
  {
    "title": "How to Customize Your Keyboard Layout",
    "content": "Learn how to customize your keyboard layout to suit your needs, with options for remapping keys, programming macros, and more."
  },
  {
    "title": "The Best Keyboards for Graphic Designers",
    "content": "Find the top keyboards for graphic designers, with features like customizable hotkeys, ergonomic design, and more to improve workflow."
  },
  {
    "title": "How to Choose the Right Switches for Your Keyboard",
    "content": "Learn about the different types of switches available for mechanical keyboards, including their sound and tactile feedback, to find the best one for you."
  },
  {
    "title": "10 Keyboards for Serious Gamers and Esports Pros",
    "content": "Discover the top keyboards designed for serious gamers and esports pros, with features like fast response times, customizable controls, and more."
  },
  {
    "title": "The Best Keyboards for Small Spaces",
    "content": "Find the top keyboards designed for small spaces, with options for compact size, wireless connectivity, and more to fit your needs."
  },
  {
    "title": "How to Improve Typing Speed and Accuracy",
    "content": "Learn tips and techniques to improve your typing speed and accuracy, with practices like touch typing, finger placement, and more."
  },
  {
    "title": "The Best Keyboards for Video Editing",
    "content": "Find the top keyboards for video editing, with features like customizable hotkeys, sleek design, and more to improve productivity."
  }
]
        for category_data in dummydata:
            thread_title = category_data["title"]
            thread_content = category_data["content"]
            thread_user= CustomUser.objects.get(id=1)
            thread_topic=Topic.objects.filter(title='Keyboard').first()

       
            # Handle the case when the category does not exist
            article=Articles.objects.create(
                title=thread_title,
                user=thread_user,
                content=thread_content,
                topic=thread_topic,
                publish=True
            )

            article.save_with_id()

        self.stdout.write(self.style.SUCCESS('Dummy data for Articles created successfully.'))
