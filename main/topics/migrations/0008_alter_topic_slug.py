# Generated by Django 4.2.4 on 2023-09-22 04:51

import autoslug.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('topics', '0007_topic_icon'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topic',
            name='slug',
            field=autoslug.fields.AutoSlugField(blank=True, editable=True, max_length=100, populate_from='title', unique=True),
        ),
    ]
