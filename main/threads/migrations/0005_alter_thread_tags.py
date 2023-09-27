# Generated by Django 4.2.3 on 2023-08-09 09:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0001_initial'),
        ('threads', '0004_thread_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='thread',
            name='tags',
            field=models.ManyToManyField(related_name='threads', to='tags.tag'),
        ),
    ]