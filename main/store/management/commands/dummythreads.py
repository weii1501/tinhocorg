from django.core.management.base import BaseCommand
from catergories.models import Category
from topics.models import Topic
from users.models import CustomUser
from threads.models import Thread

class Command(BaseCommand):
    help = 'Create dummy data for Threads model'
    
    
    def handle(self, *args, **options):
        dummydata=[
  {
    "title": "Mechanical vs. Membrane Keyboards: Pros and Cons",
    "content": "This thread discusses the differences between mechanical and membrane keyboards, highlighting their respective advantages and disadvantages. Users share their experiences and preferences, helping others make informed decisions when choosing a keyboard."
  },
  {
    "title": "Best Key Switches for Gaming: A Comprehensive Guide",
    "content": "In this thread, gaming enthusiasts share their insights on the best key switches for gaming keyboards. The discussion covers popular switch options such as Cherry MX, Kailh, and Gateron, focusing on factors like tactile feedback, actuation force, and durability."
  },
  {
    "title": "Keyboard Layouts Explained: QWERTY vs. Dvorak vs. Colemak",
    "content": "This thread delves into various keyboard layouts, including the widely used QWERTY layout, alternative layouts like Dvorak and Colemak, and their potential benefits in terms of typing speed, comfort, and reduced finger strain. Users exchange opinions, experiences, and resources to aid in layout selection."
  },
  {
    "title": "RGB Lighting on Keyboards: Style or Substance?",
    "content": "In this thread, members debate the merits of RGB lighting on keyboards. Some argue that it adds flair and customization options, while others question its practicality and potential distractions. The discussion includes recommendations for managing lighting effects and profiles."
  },
  {
    "title": "The Importance of Ergonomics in Keyboard Design",
    "content": "This thread emphasizes the significance of ergonomic keyboard design for promoting comfort and preventing repetitive strain injuries (RSIs). Users share their ergonomic keyboard setups, discuss adjustable keyboard stands, wrist rests, and ergonomic layouts, and offer tips for maintaining proper posture."
  },
  {
    "title": "Wireless vs. Wired Keyboards: Which Is Better?",
    "content": "This thread explores the advantages and disadvantages of wireless and wired keyboards. Participants discuss factors such as latency, battery life, convenience, and security. Users share their experiences with different wireless technologies like Bluetooth and 2.4GHz wireless dongles."
  },
  {
    "title": "Mac vs. Windows Keyboards: Similarities and Differences",
    "content": "In this thread, members compare and contrast keyboards designed specifically for Mac and Windows systems. The discussion covers key layout discrepancies, function key variations, media controls, and compatibility considerations. Users provide recommendations for keyboard options that cater to each platform."
  },
  {
    "title": "Customizing Your Keyboard: Keycaps, Artisan Keyboards, and More",
    "content": "This thread focuses on keyboard customization options. Users showcase their personalized keyboard setups, discuss keycap materials and profiles, and explore the world of artisan keycaps. Resources, tutorials, and recommendations for keycap sets and custom keyboard builds are shared."
  },
  {
    "title": "Compact Keyboards: 60%, 65%, and 75% Layouts",
    "content": "In this thread, compact keyboard enthusiasts delve into the various layouts available, such as 60%, 65%, and 75% keyboards. Participants discuss the advantages of a smaller form factor, the placement of arrow keys and function keys, and compatible keycap sets."
  },
  {
    "title": "N-Key Rollover and Anti-Ghosting: What Do They Mean?",
    "content": "This thread provides an overview of n-key rollover (NKRO) and anti-ghosting technologies in keyboards. Users explain the concepts, discuss their importance for gaming and fast typing, and recommend keyboards with reliable NKRO and anti-ghosting capabilities."
  }
]

        for category_data in dummydata:
            thread_title = category_data["title"]
            thread_content = category_data["content"]
            thread_user= CustomUser.objects.get(id=1)
            thread_topic=Topic.objects.filter(title='Keyboard').first()

       
            # Handle the case when the category does not exist
            thread=Thread.objects.create(
                title=thread_title,
                user=thread_user,
                content=thread_content,
                topic=thread_topic,
                publish=True
            )

            thread.save_with_id()

        self.stdout.write(self.style.SUCCESS('Dummy data for Category created successfully.'))
