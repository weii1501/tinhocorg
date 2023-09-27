from django.shortcuts import render

from threads.models import Thread
from .models import Comment
from django.db.models import Q
from .serializers import CommentSerializer
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from articles.models import Articles
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def reply_list_by_article(request, article_id):
    article=get_object_or_404(Comment, id=article_id)
    replies=Comment.objects.filter(article=article).filter(parent=None).order_by("-created_at")

    serializer=CommentSerializer(replies, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_comment(request):
    # Extract the data from the request's POST data
    print(request.data)
    article_id = request.data.get('article_id')
    thread_id = request.data.get('thread_id')
    comment_id=request.data.get('comment_id')
    user = request.user  # Assuming you are using Django's built-in authentication system
    # Ensure that the thread_id and content are present in the request
    print(article_id)
    try:
        article=Articles.objects.filter(id=article_id).first()
        # thread=Thread.objects.filter(id=thread_id).first()
    except Articles.DoesNotExist:
        print('check article')
        return Response({"error": "Invalid article ID"}, status=400)
    # except Thread.DoesNotExist:
    #     print('check thread')
    #     return Response({"error": "Invalid thread ID"}, status=400)

    # Create the reply object
    if comment_id:
        try:
            parent_comment = Comment.objects.get(id=comment_id)
            comment = Comment.objects.create(
                article=parent_comment.article,
                user=user,
                content=request.data['content'],
                parent=parent_comment
            )
        except Comment.DoesNotExist:
            return Response({"error": "Invalid parent reply ID"}, status=400)
        
    # Ensure that the thread_id and content are present in the request
    else:
        # if not article_id or not thread_id or 'content' not in request.data:
        #     return Response({"error": "Invalid request data"}, status=400)

    # Create the reply object
        comment = Comment.objects.create(
            # article_id=article_id,
            user=user,
            content=request.data['content'],
        )
        if 'article_id' in request.data:
            comment.article_id = request.data['article_id']
            comment.thread_id = None
        else:
            comment.thread_id = request.data['thread_id']
            comment.article_id = None
        comment.save()

    if article_id:
        num_comments = article.num_comments
        article.num_comments = num_comments + 1
        article.save()
    else:
        print('add num Article error')

    if thread_id:
        num_comments = thread.num_comments
        thread.num_comments = num_comments + 1
        thread.save()
    else:
        print('add num Thread error')

    # Serialize the created reply
    serializer = CommentSerializer(comment)

    # Return the serialized data
    return Response(serializer.data, status=201)

@api_view(['GET'])
def reply_list(request):

    queryset = Comment.objects.filter(parent=None).order_by('+created_at')

    search_query= request.query_params.get('search', None)
    thread_query= request.query_params.get('thread', None)

    if search_query:
        queryset= queryset.filter(Q(content__icontains=search_query))
    if thread_query:
        queryset= queryset.filter(Q(thread__exact=thread_query))

    serializer_class= CommentSerializer(queryset, many=True)
    return Response(serializer_class.data)

@api_view(['GET'])
def reply_list_article(request):
    article_id=request.GET.get('article_id')
    thread_id=request.GET.get('thread_id')
    print(f"article id:{article_id}")
    # article=get_object_or_404(Comment, id=article_id)
    if article_id:
        article=Articles.objects.get(id=article_id)
        replies=Comment.objects.filter(article=article).filter(parent=None).order_by("-created_at")
    else:
        thread=Thread.objects.get(id=thread_id)
        replies=Comment.objects.filter(thread=thread).filter(parent=None).order_by("-created_at")
    # article=Articles.objects.get(id=article_id)
    # replies=Comment.objects.filter(article=article).filter(parent=None).order_by("-created_at")

    serializer=CommentSerializer(replies, many=True)
    return Response(serializer.data)
