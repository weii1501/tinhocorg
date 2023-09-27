from rest_framework import serializers

from django.db.models import Sum
from .models import Topic


# from threads.serializers import ThreadSerializer
class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'title', 'created_at', 'slug', 'description', 'category', 'num_threads', 'num_articles', 'other_name', 'icon']


class TopicCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'title', 'created_at', 'slug', 'description', 'other_name', 'icon']
