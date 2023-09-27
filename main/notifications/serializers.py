from rest_framework import serializers

from articles.serializers import ArticleSerializer
from users.serializers import CustomUserRepliesSerializer
from .models import Notification
from threads.serializers import ThreadNotificationSerializer


class NotificationSerializer(serializers.ModelSerializer):
    thread = ThreadNotificationSerializer()
    sender = CustomUserRepliesSerializer()
    articles = ArticleSerializer()

    class Meta:
        model = Notification
        fields = '__all__'
