from rest_framework import serializers

from articles.models import Articles
from comments.models import Comment
from replies.models import Reply
from threads.models import Thread
from topics.models import Topic
from .models import Category
from topics.serializers import TopicCategoriesSerializer, TopicSerializer

from django.db.models import Sum


class CategorySerializer(serializers.ModelSerializer):
    # children= serializers.SerializerMethodField()
    #
    # def get_children(self, obj):
    #     children=obj.children.all()
    #     serializer = self.__class__(children, many=True)
    #     return serializer.data
    #
    topics = TopicCategoriesSerializer(many=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'num_posts', 'topics', 'parent', 'cover', 'num_articles', 'num_threads', 'other_name', 'icon', 'topics']


class CategoryDetailSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    parent = CategorySerializer()
    topics = TopicCategoriesSerializer(many=True)

    def get_children(self, obj):
        children = obj.children.all()
        serializer = self.__class__(children, many=True)
        return serializer.data

    # topics=TopicCategoriesSerializer(many=True)
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'num_posts', 'children', 'cover', 'parent', 'num_articles', 'num_threads', 'other_name', 'icon', 'topics']


class CategoryListTopicsSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    topics = TopicSerializer(many=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'description', 'num_posts', 'cover', 'children', 'topics', 'num_articles', 'num_threads', 'other_name', 'icon', 'topics')

    def get_children(self, obj):
        return CategorySerializer(obj.children.all(), many=True).data


class TopicFilterSerializer(serializers.ModelSerializer):
    total_replies = serializers.SerializerMethodField()
    total_views = serializers.SerializerMethodField()
    total_comments = serializers.SerializerMethodField()
    total_articles = serializers.SerializerMethodField()
    total_threads = serializers.SerializerMethodField()

    def get_total_replies(self, obj):
        user = self.context['user']  # Lấy thông tin người dùng từ context
        threads = Thread.objects.filter(user=user, topic=obj)
        total_replies = 0
        for thread in threads:
            total_replies += Reply.objects.filter(user=user, thread=thread).count()
        return total_replies

    def get_total_views(self, obj):
        user = self.context['user']  # Lấy thông tin người dùng từ context
        thread_views = obj.threads.filter(user=user).aggregate(total_views=Sum('num_views'))['total_views']
        article_views = obj.articles.filter(user=user).aggregate(total_views=Sum('num_views'))['total_views']

        total_views = (thread_views or 0) + (article_views or 0)
        return total_views

    def get_total_comments(self, obj):
        user = self.context['user']
        total_comments = 0
        articles = Articles.objects.filter(user=user, topic=obj)
        for article in articles:
            total_comments += Comment.objects.filter(user=user, article=article).count()
        return total_comments

    def get_total_articles(self, obj):
        user = self.context['user']
        total_articles = Articles.objects.filter(user=user, topic=obj).count()
        return total_articles

    def get_total_threads(self, obj):
        user = self.context['user']
        total_threads = Thread.objects.filter(user=user, topic=obj).count()
        return total_threads

    class Meta:
        model = Topic
        fields = '__all__'


class CategoryBuildSitemapSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    parent = CategorySerializer()
    topics = TopicSerializer(many=True)

    def get_children(self, obj):
        children = obj.children.all()
        serializer = self.__class__(children, many=True)
        return serializer.data

    class Meta:
        model = Category
        fields = '__all__'
