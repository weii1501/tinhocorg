# Generated by Django 4.2.3 on 2023-08-14 10:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('replies', '0003_reply_num_point_reply_vote'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reply',
            old_name='vote',
            new_name='votes',
        ),
    ]
