# Generated by Django 4.2.4 on 2023-08-23 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_customuser_facebook_alter_customuser_location_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='profile_image',
            field=models.ImageField(blank=True, default='profile_pictures/avatar_default.jpg', null=True, upload_to='profile_pictures/'),
        ),
    ]