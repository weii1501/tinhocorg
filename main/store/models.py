from autoslug import AutoSlugField
from ckeditor_uploader.fields import RichTextUploadingField
from django.db import models

# Create your models here.

class StaticPage(models.Model):
    page_name = models.CharField(max_length=255, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    slug = AutoSlugField(max_length=255, populate_from='page_name', editable=True, blank=True, unique=True)
    content = RichTextUploadingField()
    created_at = models.DateTimeField(auto_now_add=True)

