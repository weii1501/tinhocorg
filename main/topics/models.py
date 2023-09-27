from autoslug import AutoSlugField
from django.db import models
from catergories.models import Category
from users.models import CustomUser
from django.utils.text import slugify


# Create your models here.
class Topic(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='topics')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='topics')
    title = models.CharField(max_length=255)
    other_name = models.CharField(max_length=500, verbose_name="Tên khác", blank=True, null=True,  default=None)
    icon = models.CharField(max_length=50, verbose_name="Icon", blank=True, null=True,  default='streamline:interface-edit-pin-2-pin-push-thumbtack')
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    slug = AutoSlugField(max_length=100, populate_from='title', editable=True, blank=True, unique=True)
    cover = models.ImageField(upload_to='topic_images', blank=True, null=True)

    @property
    def num_threads(self):
        return self.threads.count()

    @property
    def num_articles(self):
        return self.topic_articles_set.count()

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            # Tạo slug duy nhất dựa vào title
            base_slug = slugify(self.title)
            unique_slug = base_slug
            num = 1
            while Topic.objects.filter(slug=unique_slug).exists():
                unique_slug = f"{base_slug}-{num}"
                num += 1
            self.slug = unique_slug
        super().save(*args, **kwargs)


