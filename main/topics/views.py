from django.shortcuts import render
from rest_framework import generics

from catergories.models import Category
from .models import Topic
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import TopicSerializer

# Create your views here.

@api_view(['GET'])
def list_topic(request):
    category_slug = request.GET.get('category_slug', '')
    category = Category.objects.filter(slug=category_slug).first()
    if not category:
        return Response({'ok': False, 'message': 'Category not found'}, status=200)
    topic= Topic.objects.filter(category=category)
    topic_serializer = TopicSerializer(topic, many=True)

    return Response({
        'ok': True,
        'name': category.name,
        'description': category.description,
        'data': topic_serializer.data,
        'icon': category.icon,
        'other_name': category.other_name,
    })


@api_view(['GET'])
def detail_topic(request, topic_slug):

    try:
        topic = Topic.objects.filter(slug=topic_slug).first()
    except Topic.DoesNotExist:
        return Response({'detail': 'topic not found.'}, status=404)

    if request.method == 'GET':
        serializer = TopicSerializer(topic)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = TopicSerializer(topic, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

@api_view(['GET'])
def list_all_topics(request):
    topics = Topic.objects.all()
    serializer = TopicSerializer(topics, many=True)
    return Response(serializer.data)