from autoslug import AutoSlugField
from django.db import models
from django.utils.text import slugify
# Create your models here.

class Category(models.Model):

    name = models.CharField(max_length=500, verbose_name="Chuyên mục")
    other_name = models.CharField(max_length=500, verbose_name="Tên khác", blank=True, null=True,  default=None)
    icon = models.CharField(max_length=50, verbose_name="Icon", blank=True, null=True,  default='streamline:interface-edit-pin-2-pin-push-thumbtack')
    description = models.TextField(blank=True, null=True)
    slug = AutoSlugField(max_length=100, populate_from='title', editable=True, blank=True, unique=True)
    num_posts = models.IntegerField(default=0)
    cover = models.ImageField(upload_to='category_images', blank=True, null=True)
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name='children'
    )


    @property
    def num_articles(self):
        num_articles = 0
        for topic in self.topics.all():
            num_articles += topic.num_articles
        return num_articles

    @property
    def num_threads(self):
        num_threads = 0
        for topic in self.topics.all():
            num_threads += topic.num_threads
        return num_threads

    @property
    def topics(self):
        return self.topics.all()

    class Meta:
        verbose_name = 'Categories'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)