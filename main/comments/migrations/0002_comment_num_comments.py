# Generated by Django 4.2.3 on 2023-08-14 02:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='num_comments',
            field=models.IntegerField(default=0),
        ),
    ]
