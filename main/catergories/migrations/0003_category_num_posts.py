# Generated by Django 4.2.3 on 2023-08-04 04:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catergories', '0002_alter_category_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='num_posts',
            field=models.IntegerField(default=0),
        ),
    ]
