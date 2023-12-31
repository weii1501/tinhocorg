# Generated by Django 3.2 on 2023-08-21 07:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('topics', '0003_topic_cover'),
        ('tags', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('articles', '0010_alter_articles_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='articles',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='likes_customeruser_articles_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='articles',
            name='tags',
            field=models.ManyToManyField(blank=True, related_name='tags_articles_set', to='tags.Tag'),
        ),
        migrations.AlterField(
            model_name='articles',
            name='topic',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='topic_articles_set', to='topics.topic'),
        ),
        migrations.AlterField(
            model_name='articles',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_articles_set', to=settings.AUTH_USER_MODEL),
        ),
    ]
