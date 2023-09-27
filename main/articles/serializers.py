from rest_framework import serializers
from .models import Articles
from replies.serializers import ReplySerializer
from users.serializers import CustomUserSerializer
from tags.serializers import TagsListSerializer


class ArticleSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    tags = TagsListSerializer(many=True)
    is_liked = serializers.SerializerMethodField()

    def get_is_liked(self, obj):
        if not self.context:
            return False
        user = self.context['request'].user
        if user.is_anonymous:
            return False
        return obj.likes.filter(id=user.id).exists()

    class Meta:
        model = Articles
        fields = ['id', 'user', 'title', 'content', 'tags', 'created_at', 'is_liked', 'likes', 'total_likes', 'slug',
                  'cover',
                  'views', 'num_comments', 'publish', 'num_views', 'article_description', 'is_topic']

    def get_total_likes(self, obj):
        return obj.likes.count()
