# Generated by Django 4.2.3 on 2023-08-04 09:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='articles',
            name='cover',
            field=models.ImageField(blank=True, null=True, upload_to='article_images'),
        ),
    ]
