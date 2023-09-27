from allauth.socialaccount import providers
from allauth.socialaccount.models import SocialApp
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import Group
from django.db.models import Count
from django.views.decorators.csrf import csrf_protect
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListAPIView
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from articles.models import Articles
from articles.serializers import ArticleSerializer
from catergories.serializers import TopicFilterSerializer
from comments.models import Comment
from replies.models import Reply
from threads.models import Thread
from threads.serializers import ThreadAboutSerializer, ReplyFilterSerializer, ThreadSerializer
from .decorators import validate_request_data
from .models import CustomUser
from .serializers import CustomUserSerializer, CustomUserTopSerializer, CustomUserAboutSerializer

from django.db.models import Count


# @api_view(['POST'])


@api_view(['POST'])
@validate_request_data
def create_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    username = request.data.get('username')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')

    try:
        user = CustomUser(email=email, username=username, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()

        group = Group.objects.get(name="user")
        group.user_set.add(user)

        permissions = group.permissions.all()
        user.user_permissions.set(permissions)
        return Response({'success': 'User created successfully!'}, status=status.HTTP_201_CREATED)
    except:
        return Response({'error': 'Unable to create user. Please try again.'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user_serializer = CustomUserSerializer(request.user)

    return Response(user_serializer.data)


@csrf_protect
@api_view(['POST'])
def login_api_view(request):
    """
    Đăng nhập
    """
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, email=email, password=password)
    if user is not None:
        login(request, user)
        return Response({'ok': True, 'user': CustomUserSerializer(user).data})
    return Response({'ok': False})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logout_api_view(request):
    """
    Đăng xuất
    """
    try:
        logout(request)
    except:
        return Response({'ok': False})
    return Response({'ok': True})


@api_view(['GET'])
@permission_classes([AllowAny])
def get_list_social_login(request):
    ls = {}
    for p in providers.registry.get_list():
        if SocialApp.objects.filter(provider=p.id).exists():
            ls[p.id] = request.build_absolute_uri(p.get_login_url(request=request), )
    return Response({
        'ok': True,
        'data': ls
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def about_user(request, user_id):
    # lay thon tin user
    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return Response({'detail': 'Invalid user ID'}, status=400)
    serializer = CustomUserAboutSerializer(user)

    # lay thong tin cau hoi cua user top 5
    threads = Thread.objects.filter(user=user).order_by('likes')[:5]

    # lay thong tin nhung bai viet co cau tra loi duoc tac gia phe duyet
    threads_reply = Thread.objects.filter(replies__user=user, replies__is_solved=True).order_by('likes')[:5]
    # threads_reply_serializer = ThreadAboutSerializer(threads_reply, many=True) if threads_reply else []

    # lay danh sach nhung nguoi replies nhieu nhat
    top_replies_user = CustomUser.objects.filter(replies__thread__user=user).annotate(
        total_replies=Count('replies')).order_by('-total_replies')[:5]

    return Response({
        'ok': True,
        'data': {
            'user': serializer.data,
            'threads': ThreadAboutSerializer(threads, many=True).data if threads else None,
            'top_replies_threads': ThreadAboutSerializer(threads_reply, many=True).data if threads_reply else None,
            'top_replies_user': CustomUserTopSerializer(top_replies_user, many=True).data if top_replies_user else None
        }
    }, status=200)


@api_view(['POST'])
@permission_classes([AllowAny])
def post_view(request):
    data = request.data
    thread_id = data.get('thread_id')
    article_id = data.get('article_id')
    if thread_id:
        try:
            thread = Thread.objects.get(id=thread_id)
        except Thread.DoesNotExist:
            return Response({
                'ok': False,
                'msg': 'Khong tim thay Thread'
            }, status=200)
        thread.num_views += 1
        thread.save()
        return Response({
            'ok': True,
            'msg': 'Tang so luot xem thanh cong'
        })
    elif article_id:
        try:
            article = Articles.objects.get(id=article_id)
        except Articles.DoesNotExist:
            return Response({
                'ok': False,
                'msg': 'Khong tim thay Article'
            }, status=200)
        article.num_views += 1
        article.save()
        return Response({
            'ok': True,
            'msg': 'Tang so luot xem thanh cong'
        })
    else:
        return Response({
            'ok': False,
            'msg': 'Khong tim thay Article hoac Thread'
        }, status=200)


@api_view(['GET'])
@permission_classes([AllowAny])
def filter_choice(request):
    user_id = request.GET.get('user_id')
    filter = request.GET.get('filter')
    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return Response({
            'ok': False,
            'msg': 'Khong tim thay user'
        })

    if filter == 'replies':
        replies = Reply.objects.filter(user=user, parent=None).order_by('-created_at')
        replies_serializer = ReplyFilterSerializer(replies, many=True)
        return Response({
            'ok': True,
            'data': replies_serializer.data
        })

    elif filter == 'likes':
        replies = Reply.objects.filter(user=user).order_by('num_point')
        replies_serializer = ReplyFilterSerializer(replies, many=True)
        return Response({
            'ok': True,
            'data': replies_serializer.data
        })

    elif filter == 'solved':
        replies = Reply.objects.filter(user=user, is_solved=True).order_by('num_point')
        replies_serializer = ReplyFilterSerializer(replies, many=True)
        return Response({
            'ok': True,
            'data': replies_serializer.data
        })

    elif filter == 'voted':
        replies = Reply.objects.filter(user=user).order_by('votes')
        replies_serializer = ReplyFilterSerializer(replies, many=True)
        return Response({
            'ok': True,
            'data': replies_serializer.data
        })

    elif filter == 'all':
        if not Reply.objects.filter(user=user).exists():
            return Response({
                'ok': True,
                'data': []
            })
        replies = Reply.objects.filter(user=user).order_by('-created_at')
        replies_serializer = ReplyFilterSerializer(replies, many=True)
        return Response({
            'ok': True,
            'data': replies_serializer.data
        })

    elif filter == 'topics':
        user_topics = user.topics.all()
        print(user_topics)
        return Response({
            'ok': True,
            'data': TopicFilterSerializer(user_topics, context={'user': user}, many=True).data
        })


class ReplyFilterPagination(LimitOffsetPagination):
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


class FilterChoiceListView(ListAPIView):
    serializer_class = ReplyFilterSerializer
    permission_classes = [AllowAny]
    pagination_class = ReplyFilterPagination

    def get_queryset(self):
        user_id = self.request.GET.get('user_id')
        filter = self.request.GET.get('filter')
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({
                'ok': False,
                'msg': 'Khong tim thay user'
            })

        try:
            if filter == 'replies':
                replies = Reply.objects.filter(user=user, parent=None).order_by('-created_at')
                return replies

            elif filter == 'likes':
                replies = Reply.objects.filter(user=user).order_by('num_point')
                return replies

            elif filter == 'solved':
                replies = Reply.objects.filter(user=user, is_solved=True).order_by('num_point')
                return replies

            elif filter == 'voted':
                replies = Reply.objects.filter(user=user).order_by('votes')
                return replies

            elif filter == 'all':
                replies = Reply.objects.filter(user=user).order_by('-created_at')
                return replies
        except:
            return Response({
                'ok': False,
                'msg': 'co loi xay ra'
            })

        return ({
            'ok': False,
        })


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_info_user(request):
    user = request.user
    if not user.is_authenticated:
        return Response({
            'ok': False,
            'msg': 'Chua dang nhap'
        })
    try:
        user.first_name = request.data.get('first_name')
        user.last_name = request.data.get('last_name')
        user.username = request.data.get('username')
        user.location = request.data.get('location')
        user.birth_year = request.data.get('birth_year')
        user.number_phone = request.data.get('number_phone')
        user.facebook = request.data.get('facebook')
        user.tiktok = request.data.get('tiktok')
        user.email = request.data.get('email')
        user.save()
    except Exception as e:
        print(e)
        return Response({
            'ok': False,
            'msg': 'Co loi xay ra'
        })

    return Response({
        'ok': True,
        'msg': 'Cap nhat thong tin thanh cong',
        'data': CustomUserSerializer(user).data
    })


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


class ListActivityThreadsAPIView(ListAPIView):
    serializer_class = ThreadSerializer
    permission_classes = [AllowAny]
    pagination_class = ListPagination

    def get_queryset(self):
        user_id = self.request.GET.get('user_id')
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({
                'ok': False,
                'msg': 'Khong tim thay user'
            })
        threads = Thread.objects.filter(user=user).order_by('-created_at')
        return threads


class ListActivityArticlesAPIView(ListAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [AllowAny]
    pagination_class = ListPagination

    def get_queryset(self):
        user_id = self.request.GET.get('user_id')
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({
                'ok': False,
                'msg': 'Khong tim thay user'
            })
        articles = Articles.objects.filter(user=user).order_by('-created_at')
        return articles


class UserFilterArticleAPIView(ListAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.request.GET.get('user_id')
        filter = self.request.GET.get('filter')
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({
                'ok': False,
                'msg': 'Khong tim thay user'
            })
        if filter == 'comment':
            list_articles_id = []
            most_commented_article = Comment.objects.filter(user=user) \
                                         .values('article') \
                                         .annotate(comment_count=Count('article')) \
                                         .order_by('-comment_count')[:10]
            for i in most_commented_article:
                list_articles_id.append(i['article'])

            articles = Articles.objects.filter(id__in=list_articles_id)
            # print(articles)
            return articles if articles is not None else Articles.objects.none()


class UserFilterThreadAPIView(ListAPIView):
    serializer_class = ThreadSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.request.GET.get('user_id')
        filter = self.request.GET.get('filter')
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({
                'ok': False,
                'msg': 'Khong tim thay user'
            })
        if filter == 'reply':
            list_threads_id = []
            most_commented_article = Reply.objects.filter(user=user) \
                                         .values('thread') \
                                         .annotate(reply_count=Count('thread')) \
                                         .order_by('-reply_count')[:10]
            for i in most_commented_article:
                list_threads_id.append(i['thread'])

            threads = Thread.objects.filter(id__in=list_threads_id)
            # print(articles)
            return threads if threads is not None else Thread.objects.none()
