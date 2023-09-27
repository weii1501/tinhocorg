from django.db import models
from autoslug import AutoSlugField


# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=50)
    slug = AutoSlugField(max_length=100, populate_from='name', editable=True, blank=True, always_update=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
