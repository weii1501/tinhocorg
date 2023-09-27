from django.shortcuts import render
from .models import Reply
from django.db.models import Q
from .serializers import ReplySerializer
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from threads.models import Thread
from django.shortcuts import get_object_or_404
from django.db.models import Case, When, Value, BooleanField

@api_view(['GET'])
def reply_list_by_thread(request, thread_id):

    thread=get_object_or_404(Thread, id=thread_id)
    print(f"thread: {thread}")
    replies = Reply.objects.filter(thread=thread, parent=None).annotate(
        is_solved_first=Case(
            When(is_solved=True, then=Value(0)),
            default=Value(1),
            output_field=BooleanField()
        )
    ).order_by("is_solved_first", "-created_at")

    serializer=ReplySerializer(replies, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_reply(request):
    # Extract the data from the request's POST data
    thread_id = request.data.get('thread_id')
    reply_id=request.data.get('reply_id')
    user = request.user  # Assuming you are using Django's built-in authentication system


    if reply_id:
        try:
            parent_reply = Reply.objects.get(id=reply_id)
            reply = Reply.objects.create(
                thread=parent_reply.thread,
                user=user,
                content=request.data['content'],
                parent=parent_reply
            )
        except Reply.DoesNotExist:
            return Response({"error": "Invalid parent reply ID"}, status=400)
        
    # Ensure that the thread_id and content are present in the request
    else:
        if not thread_id or 'content' not in request.data:
            return Response({"error": "Invalid request data"}, status=400)

    # Create the reply object
        reply = Reply.objects.create(
            thread_id=thread_id,
            user=user,
            content=request.data['content'],

        )

    # Serialize the created reply
    serializer = ReplySerializer(reply)

    # Return the serialized data
    return Response(serializer.data, status=201)

@api_view(['GET'])
def reply_list(request):

    queryset = Reply.objects.filter(parent=None).order_by('+created_at')

    search_query= request.query_params.get('search', None)
    thread_query= request.query_params.get('thread', None)

    if search_query:
        queryset= queryset.filter(Q(content__icontains=search_query))
    if thread_query:
        queryset= queryset.filter(Q(thread__exact=thread_query))

    serializer_class= ReplySerializer(queryset, many=True)
    return Response(serializer_class.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def solve_reply(request):
    user = request.user
    thread_id = request.data.get('thread_id')
    reply_id = request.data.get('reply_id')

    try:
        thread = Thread.objects.get(id=thread_id, user=user)
        if thread.is_solved:
            return Response({
                'ok': True,
                'msg': 'Đã giải quyết thread truoc do'
            })
        else:
            thread.is_solved = True
            thread.save()
            reply = Reply.objects.get(id=reply_id)
            reply.is_solved = True
            reply.save()
            return Response({
                'ok': True,
                'msg': 'Đã giải quyết'
            })

    except Thread.DoesNotExist:
        return Response({
            'ok': False,
            'msg': 'Không tìm thấy thread'
        }, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def point_reply(request):
    user = request.user
    reply_id= request.data.get('reply_id')
    action = request.data.get('action')
    if user.is_authenticated:
        try:
            reply = Reply.objects.get(id=reply_id)
            if user in reply.votes.all():
                return Response({
                    'ok': False,
                    'msg': 'Bạn đã vote trước đó'
                }, status=200)
            else:
                if action == 'upvote':
                    reply.num_point += 1
                elif action == 'downvote':
                    reply.num_point -= 1
                reply.votes.add(user)
                reply.save()
                return Response({
                    'ok': True,
                    'msg': 'Đã vote'
                })
        except Exception as e:
            return Response({'error': str(e)}, status=500)
    else:
        return Response({
            'ok': False,
            'msg': 'Bạn cần đăng nhập để vote'
        }, status=200)



