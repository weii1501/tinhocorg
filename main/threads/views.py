from tags.models import Tag
from .models import Thread
from topics.models import Topic
from users.models import CustomUser
from .serializers import ThreadSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Q
from django.core.paginator import Paginator

from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination
from rest_framework.generics import ListAPIView
from django.conf import settings


@api_view(['GET'])
@permission_classes([AllowAny])
def list_threads(request, topic_slug):
    # topic = get_object_or_404(Topic, slug=topic_slug)
    topic = Topic.objects.filter(slug=topic_slug).first()
    filterParam = request.query_params.get('filter', None)
    if not topic:
        return Response({'detail': '404 Not found'}, status=404)

    filter = f'-{filterParam}' if filterParam else '-created_at'
    queryset = Thread.objects.filter(Q(topic=topic)).filter(publish__exact=True, status='P').order_by(filter)

    search_query = request.query_params.get('s', None)
    topic_query = request.query_params.get('t', None)

    if search_query:
        queryset = queryset.filter(Q(title__icontains=search_query))
    if topic_query:
        queryset = queryset.filter(Q(topic__exact=topic_query))

    page = Paginator(queryset, 10)
    page_number = request.GET.get("page")
    page_obj = page.get_page(page_number)

    threads_serializer = ThreadSerializer(page_obj, many=True)
    page_data = {
        'has_next': page_obj.has_next(),
        'has_previous': page_obj.has_previous(),
        'next_page_number': page_obj.next_page_number() if page_obj.has_next() else None,
        'previous_page_number': page_obj.previous_page_number() if page_obj.has_previous() else None,
        'number': page_obj.number,
        'total_pages': page_obj.paginator.num_pages,
        'count': page_obj.paginator.count,
    }

    return Response({"data": threads_serializer.data, "page": page_data})


@api_view(['GET'])
@permission_classes([AllowAny])
def get_detail(request, thread_id):
    try:
        query_set = Thread.objects.filter(id=thread_id)
    except Thread.DoesNotExist:
        return Response({'detail': '404 Not found'}, status=404)
    print(f"query set:{query_set}")
    serializer = ThreadSerializer(query_set, context={'request': request}, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_lastest(request):
    queryset = Thread.objects.filter(publish__exact=True).order_by('-created_at')[:5]
    serializer = ThreadSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_thread(request):
    user = request.user
    topic = request.data.get('topic')
    title = request.data.get('title')
    content = request.data.get('content')
    tags_str = request.data.get('tags')
    publish = True

    if not user.has_perm('threads.create_thread'):
        publish = False

    try:
        topic = Topic.objects.filter(slug=topic).first()
    except Topic.DoesNotExist:
        return Response({'detail': 'Invalid topic ID'}, status=400)

    thread = Thread.objects.create(user=user, publish=publish, topic=topic, title=title, content=content, status='C')
    if tags_str:
        tags_str = tags_str.split(',')
        tags = Tag.objects.filter(slug__in=tags_str)
        thread.tags.add(*tags)
    thread.save_with_id()
    serializer = ThreadSerializer(thread)
    return Response(serializer.data, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_all(request):
    queryset = Thread.objects.all()
    serializer = ThreadSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def approve_thread(request, thread_id):
    user = request.user
    if not user.has_perm('threads.approve_thread'):
        return Response({'detail': 'You do not have permission to approve threads'}, status=403)
    try:
        thread = Thread.objects.get(id=thread_id)
    except Thread.DoesNotExist:
        return Response({'detail': 'Invalid thread ID'}, status=400)
    thread.publish = True
    thread.status = 'P'
    thread.save()
    return Response({'ok': True}, status=200)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_thread(request, thread_id):
    user = request.user
    if not user.has_perm('threads.update_thread'):
        return Response({'detail': 'You do not have permission to update threads'}, status=403)
    try:
        thread = Thread.objects.get(id=thread_id)
    except Thread.DoesNotExist:
        return Response({'detail': 'Invalid thread ID'}, status=400)
    thread.title = request.data.get('title')
    thread.content = request.data.get('content')
    thread.topic = Topic.objects.filter(slug=request.data.get('topic')).first()
    tags = request.data.get('tags').split(',')
    thread.tags.clear()
    for tag in tags:
        print(Tag.objects.filter(slug=tag).first())
        thread.tags.add(Tag.objects.filter(slug=tag).first())
    thread.save()
    return Response({'ok': True, 'msg': 'Chỉnh sửa thành công'}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_thread(request):
    user = request.user
    thread_id = request.data.get('thread_id')
    action = request.data.get('action')
    try:
        thread = Thread.objects.get(id=thread_id)
    except Thread.DoesNotExist:
        return Response({'detail': 'Invalid thread ID'}, status=400)

    if action == 'like':
        if thread.likes.filter(id=user.id).exists():
            thread.likes.remove(user)
            return Response({
                'ok': True,
                'msg': 'Đã bỏ thích bài viết'
            }, status=200)
        else:
            thread.likes.add(user)
            return Response({
                'ok': True,
                'msg': 'Đã thích bài viết'
            }, status=200)


class ThreadPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 100

    def get_paginated_response(self, data):
        # Lấy các tham số truy vấn hiện tại
        params = self.request.query_params.copy()
        if 'limit' in params:
            del params['limit']
        if 'offset' in params:
            del params['offset']
        # Tạo url cho các trang
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


class GetThreadListAPIView(ListAPIView):
    serializer_class = ThreadSerializer
    pagination_class = ThreadPagination
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Thread.objects.filter(publish=True).order_by('-created_at')


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all(request):
    queryset = Thread.objects.all()
    serializer = ThreadSerializer(queryset, many=True)
    return Response(serializer.data)


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


class GetThreadsLastUploadAPIView(ListAPIView):
    serializer_class = ThreadSerializer
    pagination_class = ListPagination
    permission_classes = [AllowAny]

    def get_queryset(self):
        topic = self.request.query_params.get('topic', None)
        filter = self.request.query_params.get('filter', None)
        if not topic:
            order_by = f"-{filter}" if filter else '-created_at'
            return Thread.objects.filter(publish__exact=True, status__exact='P').order_by(order_by)
        else:
            try:
                topic = Topic.objects.get(slug=topic)
            except Topic.DoesNotExist:
                return Thread.objects.filter(publish__exact=True, status__exact='P').order_by('-created_at')
            return Thread.objects.filter(Q(topic=topic)).filter(publish__exact=True, status__exact='P').order_by(
                '-created_at')
