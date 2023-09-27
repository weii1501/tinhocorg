from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from articles.models import Articles
from articles.serializers import ArticleSerializer
from tags import models
from tags.serializers import TagsListSerializer

from tags.models import Tag
from threads.models import Thread
from threads.serializers import ThreadSerializer

from rest_framework.generics import ListAPIView

from django.db.models import Count


@api_view(['GET'])
@permission_classes([AllowAny])
def get_tags_list(request):
    queryset = Tag.objects.all()
    serializer = TagsListSerializer(queryset, many=True)
    return Response({
        'ok': True,
        'data': serializer.data
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def get_articles_thread_tags(request, tag_slug):
    queryset = Tag.objects.filter(slug=tag_slug)
    threads = Thread.objects.filter(tags__in=queryset)
    articles = Articles.objects.filter(tags__in=queryset)
    return Response({
        'ok': True,
        'data': {
            'tag': TagsListSerializer(queryset.first()).data,
            'articles': ArticleSerializer(articles, many=True).data,
            'threads': ThreadSerializer(threads, many=True).data
        }
    })


class ListTopTags(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = TagsListSerializer

    def get_queryset(self):
        top_tags = Tag.objects.annotate(
            threads_total_likes=Count('threads__likes'),
            articles_total_likes=Count('tags_articles_set__likes')
        ).order_by(
            'threads_total_likes',
            'articles_total_likes',
        ).distinct()
        unique_tags = []
        tag_ids = set()

        for tag in top_tags:
            if tag.id not in tag_ids:
                unique_tags.append(tag)
                tag_ids.add(tag.id)

        return unique_tags[:10]
