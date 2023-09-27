import json
from channels.generic.websocket import AsyncWebsocketConsumer
from users.models import CustomUser
from .models import Notification
from threads.models import Thread
from .serializers import NotificationSerializer
from asgiref.sync import sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("notifications", self.channel_name)
        print("connected")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("notifications", self.channel_name)
        print("disconnected")

    async def send_message(self, event):
        await self.send(
            text_data=json.dumps(event)  # Make sure to serialize the event data to JSON
        )
        print("message sent")

    async def receive(self, text_data):
        try:
            text_data_json = json.loads(text_data)
            print(f"{text_data_json}")
            sender_user_info = text_data_json.get('from')
            target_user_info = text_data_json.get('to')
            message = text_data_json.get('message')
            thread_id=text_data_json.get('thread')

            # Create and save the notification in the database
            sender_user = await sync_to_async(CustomUser.objects.get)(id=sender_user_info)
            target_user = await sync_to_async(CustomUser.objects.get)(id=target_user_info)
            thread = await sync_to_async(Thread.objects.get)(pk=thread_id)

            notification = await sync_to_async(Notification.objects.create)(
                sender=sender_user,
                recipient=target_user,
                message=message,
                thread=thread
            )
            serializer_data=NotificationSerializer(notification)
            # Broadcast the notification to the target user
            await self.channel_layer.group_send(
                "notifications",
                {
                    "type": "user_notification",
                    "message": "You have a new notification"
                },
            )
        except (json.JSONDecodeError, CustomUser.DoesNotExist):
            pass

    async def user_notification(self, event):
        message = event.get('message', '')
        await self.send_message(message)       