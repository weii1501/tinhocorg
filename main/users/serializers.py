from django.contrib.auth.models import Group
from rest_framework import serializers

from articles.models import Articles
from threads.models import Thread
from .models import CustomUser

from django.db.models import Sum


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)


class CustomUserSerializer(serializers.ModelSerializer):
    groups = serializers.StringRelatedField(many=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'last_name', 'first_name', 'profile_image', 'groups', 'is_auth', 'location',
                  'birth_year', 'number_phone', 'facebook', 'tiktok', 'email']


class CustomUserRepliesSerializer(serializers.ModelSerializer):
    groups = serializers.StringRelatedField(many=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'last_name', 'first_name', 'profile_image', 'groups']


class CustomUserTopSerializer(serializers.ModelSerializer):
    groups = serializers.StringRelatedField(many=True)
    total_replies = serializers.SerializerMethodField()

    def get_total_replies(self, obj):
        return obj.total_replies

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username', 'last_name', 'first_name', 'profile_image', 'groups', 'user_permissions',
                  'is_auth', 'total_replies']


class CustomUserAboutSerializer(serializers.ModelSerializer):
    total_articles = serializers.SerializerMethodField()
    total_threads = serializers.SerializerMethodField()
    total_likes = serializers.SerializerMethodField()
    total_replies = serializers.SerializerMethodField()
    total_views = serializers.SerializerMethodField()

    def get_total_articles(self, obj):
        return Articles.objects.filter(user=obj).count()

    def get_total_threads(self, obj):
        return Thread.objects.filter(user=obj).count()

    def get_total_likes(self, obj):
        total_likes_article = Articles.objects.filter(user=obj).aggregate(total_likes=Sum('likes'))['total_likes'] or 0
        total_likes_thread = Thread.objects.filter(user=obj).aggregate(total_likes=Sum('likes'))['total_likes'] or 0
        return total_likes_article + total_likes_thread

    def get_total_replies(self, obj):
        # total_replies_article = Articles.objects.filter(user=obj).aggregate(total_replies=Sum('replies'))['total_replies'] or 0
        total_replies_thread = Thread.objects.filter(user=obj).aggregate(total_replies=Sum('replies'))[
                                   'total_replies'] or 0
        return total_replies_thread

    def get_total_views(self, obj):
        total_views_article = Articles.objects.filter(user=obj).aggregate(total_views=Sum('num_views'))[
                                  'total_views'] or 0
        total_views_thread = Thread.objects.filter(user=obj).aggregate(total_views=Sum('num_views'))['total_views'] or 0
        return total_views_article + total_views_thread

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username', 'last_name', 'first_name', 'profile_image', 'user_permissions', 'is_auth',
                  'total_articles', 'total_threads', 'total_likes', 'total_replies', 'total_views', 'location',
                  'birth_year', 'number_phone', 'facebook', 'tiktok']
