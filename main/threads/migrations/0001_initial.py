# Generated by Django 4.2.3 on 2023-08-04 03:13

import ckeditor_uploader.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('topics', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Thread',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('slug', models.CharField(blank=True, max_length=255)),
                ('content', ckeditor_uploader.fields.RichTextUploadingField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('publish', models.BooleanField(default=True)),
                ('topic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='threads', to='topics.topic')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='threads', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
