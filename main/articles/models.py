from django.db import models
from autoslug import AutoSlugField
from tags.models import Tag
from topics.models import Topic
from users.models import CustomUser
from ckeditor_uploader.fields import RichTextUploadingField
from django.utils.text import slugify

# Create your models here.
class Articles(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='topic_articles_set')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='user_articles_set')
    title = models.CharField(max_length=255)
    slug = AutoSlugField(max_length=100, populate_from='title', editable=True, blank=True, unique=True)
    article_description = models.TextField(blank=True, null=True)
    content = RichTextUploadingField()
    created_at = models.DateTimeField(auto_now_add=True)
    publish = models.BooleanField(default=True)
    views = models.PositiveIntegerField(default=0)
    cover = models.ImageField(upload_to='article_images', blank=True, null=True)
    tags = models.ManyToManyField(Tag, blank=True, related_name='tags_articles_set')
    num_comments = models.IntegerField(default=0)
    likes = models.ManyToManyField(CustomUser, blank=True, related_name='likes_customeruser_articles_set')
    num_views = models.PositiveIntegerField(default=0)

    STATUS_THREAD_CHOICES = (
        ('C', 'Đang chờ'),
        ('P', 'Công khai'),
        ('B', 'Cấm'),
    )
    status = models.CharField(max_length=1, choices=STATUS_THREAD_CHOICES, default='C')

    def __str__(self):
        return self.title
    
    def save_with_id(self, *args, **kwargs):
        if not self.slug:
            self.slug = f"{slugify(self.title)}.{self.id}"
        super().save(*args, **kwargs)

    def infor_user(self):
        return {
            'id': self.user.id,
            'username': self.user.username,
            'avatar': self.user.profile_image,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name
        }

    @property
    def tag_names(self):
        return [{
            'id': tag.id,
            'name': tag.name,
            'slug': tag.slug
        } for tag in self.tags.all()]

    @property
    def total_likes(self):
        return self.likes.count()

    @property
    def is_topic(self):
        return {
            'id': self.topic.id,
            'name': self.topic.title,
            'slug': self.topic.slug
        }