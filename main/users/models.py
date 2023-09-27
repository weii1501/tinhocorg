from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    def create_superuser(self, email, password, username, first_name, last_name, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True')

        return self.create_user(email, password, username, first_name, last_name, **other_fields)

    def create_user(self, email, password, username, first_name, last_name, **other_fields):
        if not email:
            raise ValueError('Please provide an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, first_name=first_name, last_name=last_name, **other_fields)
        user.set_password(password)
        user.save()
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    about = models.TextField(_('about'), max_length=500, blank=True)
    is_staff = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_auth = models.BooleanField(default=True)
    profile_image = models.ImageField(upload_to='profile_pictures/',
                                      default='profile_pictures/avatar_default.jpg',
                                      null=True, blank=True)
    objects = CustomUserManager()
    location = models.CharField(max_length=100, blank=True)
    birth_year = models.IntegerField(null=True, blank=True)
    number_phone = models.CharField(max_length=10, blank=True)
    facebook = models.CharField(max_length=100, blank=True)
    tiktok = models.CharField(max_length=100, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return self.username

    @property
    def total_articles(self):
        return self.user_articles_set.count()
