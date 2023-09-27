from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from articles.models import Articles
from notifications.models import Notification
from notifications.serializers import NotificationSerializer
from threads.models import Thread
from users.models import CustomUser


# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_noti(request):
    user = request.user
    if user.is_authenticated:
        notifications = Notification.objects.filter(recipient=user).order_by('-created_at')
        return Response({
            'ok': True,
            'data': NotificationSerializer(notifications, many=True).data
        }, status=200)
    else:
        return Response({'error': 'User is not authenticated!'}, status=400)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def put_read(request, id):
    user = request.user
    if user.is_authenticated:
        notification = Notification.objects.filter(id=id).first()
        notification.is_read = True
        notification.save()
        return Response({
            'ok': True
        }, status=200)
    else:
        return Response({'error': 'User is not authenticated!'}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_notification(request):
    sender = CustomUser.objects.get(id=request.data['sender'])
    recipient = CustomUser.objects.get(id=request.data['recipient'])
    message = request.data['message']
    print(request.data['message'])
    if request.user.is_authenticated:
        if not request.data['thread'] == '':
            thread = Thread.objects.filter(id=request.data['thread']).first()
            notification = Notification.objects.create(
                sender=sender,
                recipient=recipient,
                thread=thread,
                message=message
            )
            return Response({
                'ok': True,
                'data': NotificationSerializer(notification).data
            }, status=200)
        else:
            articles = Articles.objects.filter(id=request.data['article']).first()
            notification = Notification.objects.create(
                sender=sender,
                recipient=recipient,
                articles=articles,
                message=message
            )
            return Response({
                'ok': True,
                'data': NotificationSerializer(notification).data
            }, status=200)
    else:
        return Response({'error': 'User is not authenticated!'}, status=400)


