# Generated by Django 4.2.3 on 2023-08-14 03:12

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('articles', '0004_articles_num_comments'),
    ]

    operations = [
        migrations.AddField(
            model_name='articles',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='liked_articles', to=settings.AUTH_USER_MODEL),
        ),
    ]
