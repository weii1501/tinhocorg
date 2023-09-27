from rest_framework import serializers

from replies.models import Reply
from replies.serializers import ReplySerializer
from tags.serializers import TagsListSerializer
from topics.serializers import TopicCategoriesSerializer
from users.serializers import CustomUserSerializer, CustomUserRepliesSerializer
from .models import Thread

from django.core.validators import MinValueValidator


class ThreadSerializer(serializers.ModelSerializer):
    tags = TagsListSerializer(many=True)
    user= CustomUserSerializer()
    topic= TopicCategoriesSerializer()
    is_liked = serializers.SerializerMethodField()
    total_likes = serializers.IntegerField(source='get_total_likes', default=0)
    total_replies = serializers.IntegerField(source='get_total_replies', default=0)
    total_participants = serializers.IntegerField(source='get_total_participants', default=0)  # Thêm trường 'total_participants'
    latest_reply = serializers.SerializerMethodField()

    def get_latest_reply(self, obj):
        latest_reply = obj.replies.order_by('-created_at').first()
        if latest_reply:
            serialized_reply = ReplySerializer(latest_reply)
            return serialized_reply.data
        return None

    def get_is_liked(self, obj):
        if not self.context:
            return False
        user = self.context['request'].user
        if user.is_anonymous:
            return False
        print('like')
        return obj.likes.filter(id=user.id).exists()

    def get_total_likes(self, obj):
        return obj.get_total_likes()

    class Meta:
        model= Thread
        # fields='__all__'
        fields=['id', 'user', 'title', 'content', 'tags', 'created_at', 'topic', 'slug', 'publish', 'likes', 'is_liked',
                'total_likes', 'total_replies', 'total_participants', 'latest_reply', 'num_views', 'status', 'is_topic']



class ThreadNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Thread
        fields=['id', 'title', 'slug']


class ThreadAboutSerializer(serializers.ModelSerializer):
    total_likes = serializers.IntegerField(source='get_total_likes')

    def get_total_likes(self, obj):
        return obj.get_total_likes()
    class Meta:
        model= Thread
        fields=['id', 'title', 'slug', 'created_at', 'publish', 'total_likes', 'likes', 'total_likes']


class ReplyFilterSerializer(serializers.ModelSerializer):
    children= serializers.SerializerMethodField()
    user = CustomUserRepliesSerializer()
    thread = ThreadSerializer()  # Serializer của Thread
    def get_children(self, obj):
        children=obj.children.order_by("-created_at")
        serializer = self.__class__(children, many=True)
        return serializer.data
    class Meta:
        model= Reply
        fields='__all__'