# Generated by Django 4.2.4 on 2023-09-21 03:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('topics', '0005_topic_other_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topic',
            name='other_name',
            field=models.CharField(blank=True, default=None, max_length=500, null=True, verbose_name='Tên khác'),
        ),
    ]
