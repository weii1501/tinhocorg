from autoslug import AutoSlugField
from ckeditor_uploader.fields import RichTextUploadingField
from django.db import models
from django.utils.text import slugify

from tags.models import Tag
from topics.models import Topic
from users.models import CustomUser


# Create your models here.
class Thread(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='threads')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='threads')
    title = models.CharField(max_length=255)
    slug = AutoSlugField(max_length=100, populate_from='title', editable=True, blank=True, unique=True)
    content = RichTextUploadingField()
    created_at = models.DateTimeField(auto_now_add=True)
    publish= models.BooleanField(default=True)

    STATUS_THREAD_CHOICES = (
        ('C', 'Đang chờ'),
        ('P', 'Công khai'),
        ('B', 'Cấm'),
    )
    status = models.CharField(max_length=1, choices=STATUS_THREAD_CHOICES, default='C')
    tags = models.ManyToManyField(Tag, related_name='threads')
    likes = models.ManyToManyField(CustomUser, related_name='threads_liked', blank=True)
    num_views = models.PositiveIntegerField(default=0)
    is_solved = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def tag_names(self):
        return [{
            'id': tag.id,
            'name': tag.name,
            'slug': tag.slug
        } for tag in self.tags.all()]

    def infor_user(self):
        return {
            'id': self.user.id,
            'username': self.user.username,
            'avatar': self.user.profile_image,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name
        }
    
    def save_with_id(self, *args, **kwargs):
        if not self.slug:
            self.slug = f"{slugify(self.title)}.{self.pk}"
        if not self.publish:
            self.publish=True
        return super().save(*args, **kwargs)

    @property
    def get_total_likes(self):
        return self.likes.count()

    @property
    def get_total_replies(self):
        return self.replies.count()

    @property
    def get_total_participants(self):
        return self.replies.values('user').distinct().count()

    @property
    def get_last_reply(self):
        return self.replies.order_by('-created_at').first()

    @property
    def is_topic(self):
        return {
            'id': self.topic.id,
            'name': self.topic.title,
            'slug': self.topic.slug
        }
