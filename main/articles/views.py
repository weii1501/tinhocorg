import base64

from bs4 import BeautifulSoup
from django.core.files.base import ContentFile
from django.core.paginator import Paginator
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListAPIView
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from main import settings
from tags.models import Tag
from topics.models import Topic
from topics.serializers import TopicSerializer
from .models import Articles
from .serializers import ArticleSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def list_articles(request, topic_slug):
    # topic = get_object_or_404(Topic, slug=topic_slug).first()
    print(topic_slug)
    filterParam = request.query_params.get('filter', None)
    try:
        topic = Topic.objects.filter(slug=topic_slug).first()
    except:
        return Response({
            'ok': False,
            'detail': 'Topic not found'
        }, status=200)
    filter = f'-{filterParam}' if filterParam else '-created_at'
    queryset = Articles.objects.filter(Q(topic=topic)).filter(publish__exact=True, status__exact='P').order_by(
        filter)

    search_query = request.query_params.get('s', None)
    topic_query = request.query_params.get('t', None)

    if search_query:
        queryset = queryset.filter(Q(title__icontains=search_query))
    if topic_query:
        queryset = queryset.filter(Q(topic__exact=topic_query))

    page = Paginator(queryset, 10)
    page_number = request.GET.get("page")
    page_obj = page.get_page(page_number)

    threads_serializer = ArticleSerializer(page_obj, many=True)
    page_data = {
        'has_next': page_obj.has_next(),
        'has_previous': page_obj.has_previous(),
        'next_page_number': page_obj.next_page_number() if page_obj.has_next() else None,
        'previous_page_number': page_obj.previous_page_number() if page_obj.has_previous() else None,
        'number': page_obj.number,
        'total_pages': page_obj.paginator.num_pages,
        'count': page_obj.paginator.count,
    }

    return Response({"data": threads_serializer.data, "page": page_data, "topic": TopicSerializer(topic).data})


@api_view(['GET'])
@permission_classes([AllowAny])
def get_detail(request, thread_id):
    try:
        query_set = Articles.objects.filter(id=thread_id)
    except Articles.DoesNotExist:
        return Response({'detail': '404 Not found'}, status=404)
    print(f"query set:{query_set}")
    serializer = ArticleSerializer(query_set, context={'request': request}, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_lastest(request):
    queryset = Articles.objects.filter(publish__exact=True).order_by('-created_at')[:5]
    serializer = ArticleSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_article(request):
    user = request.user
    topic = request.data.get('topic')
    title = request.data.get('title')
    content = request.data.get('content')
    tags_str = request.data.get('tags')
    cover = request.data.get('cover')
    article_description = request.data.get('article_description')
    status = 'P'
    publish = True

    if not user.has_perm('threads.create_thread'):
        publish = False
    try:
        topic = Topic.objects.filter(slug=topic).first()
    except Topic.DoesNotExist:
        return Response({'detail': 'Invalid topic ID'}, status=400)

    article = Articles.objects.create(user=user, publish=publish, topic=topic, title=title, content=content,
                                      status=status, article_description=article_description)

    if cover:
        article.cover.save(f'{article.slug}-cover.png', cover, save=True)
        print("cover successful")
    else:
        print("no cover")
        # Tạo đối tượng BeautifulSoup để phân tích HTML
        soup = BeautifulSoup(content, 'html.parser')

        # Tìm tất cả các thẻ img trong trường content
        img_tags = soup.find_all('img')

        # Duyệt qua từng thẻ img và trích xuất dữ liệu hình ảnh
        for img in img_tags:
            # Lấy giá trị thuộc tính src
            src = img['src']

            # Kiểm tra xem source có phải là mã base64 không
            if src.startswith('data:image/'):
                # Tách phần mã base64 từ source
                base64_data = src.split(';base64,', 1)[1]

                # Giải mã base64 thành dữ liệu hình ảnh
                image_data = base64.b64decode(base64_data)

                # Lưu dữ liệu hình ảnh vào trường cover của article
                article.cover.save('cover_image.png', ContentFile(image_data), save=False)

    if tags_str:
        tags_str = tags_str.split(',')
        tags = Tag.objects.filter(slug__in=tags_str)
        unique_tags = []
        tag_slugs = set()
        for tag in tags:
            if tag.slug not in tag_slugs:
                unique_tags.append(tag)
                tag_slugs.add(tag.slug)
        article.tags.set(unique_tags)
    article.save_with_id()

    serializer = ArticleSerializer(article, context={'request': request})
    return Response(serializer.data, status=201)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_article(request):
    user = request.user
    article_id = request.data.get('article_id')
    action = request.data.get('action')
    article = Articles.objects.filter(id=article_id).first()
    # if not user.has_perm('articles.likes'):
    #     return Response({'detail': 'You do not have permission to like this article'}, status=403)
    # try:
    #     print(article)
    # except Articles.DoesNotExist:
    #     return Response({'detail': 'Invalid article ID'}, status=400)
    if not user.is_authenticated:
        return Response({'detail': 'You must be authenticated to like this article'}, status=403)
    else:
        if action == 'like':
            if article.likes.filter(id=user.id).exists():
                # Người dùng đã thích bài viết
                article.likes.remove(user)
                return Response({'detail': 'You  unliked this article'}, status=200)
            else:
                article.likes.add(user)
                # Người dùng chưa thích bài viết
                return Response({
                    'ok': True,
                    'msg': 'You liked this article',
                }, status=200)

    # return Response({'detail': 'You liked this article'}, status=200)


@api_view(['GET'])
def get_all(request):
    queryset = Articles.objects.filter(publish__exact=True).order_by('-created_at')
    serializer = ArticleSerializer(queryset, many=True)
    return Response(serializer.data)

class ArticleListPagination(LimitOffsetPagination):
    max_limit = 100
    default_limit = 10

    def get_paginated_response(self, data):
        # Lấy các tham số truy vấn hiện tại
        params = self.request.query_params.copy()
        if 'limit' in params:
            del params['limit']
        if 'offset' in params:
            del params['offset']

        next = None
        previous = None

        if not settings.DEBUG:
            if self.get_next_link():
                next = self.get_next_link().replace('http://', 'https://')
            if self.get_previous_link():
                previous = self.get_previous_link().replace('http://', 'https://')
        else:
            next = self.get_next_link()
            previous = self.get_previous_link()
        return Response(
            {
                'count': self.count,
                'next': next,
                'previous': previous,
                'data': data,
            }
        )

class ListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response({
            'numItems': self.page.paginator.count,
            'totalPages': self.page.paginator.num_pages,
            'pageSize': self.page_size,
            'currentPage': self.page.number,
            'data': data,
        })

class GetArticlesLastUploadAPIView(ListAPIView):
    serializer_class = ArticleSerializer
    pagination_class = ListPagination
    permission_classes = [AllowAny]

    def get_queryset(self):
        # topic = self.request.query_params.get('topic', None)
        filter = self.request.query_params.get('filter', None)
        order_by = f'-{filter}' if filter else '-created_at'
        articles = Articles.objects.filter(publish__exact=True, status__exact='P').order_by(order_by)
        return articles

