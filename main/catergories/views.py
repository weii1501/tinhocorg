from django.shortcuts import render
from rest_framework import generics
from .models import Category
from .serializers import CategorySerializer, CategoryDetailSerializer, CategoryListTopicsSerializer, \
    CategoryBuildSitemapSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny


#API category


#get list
@api_view(['GET'])
def list_category_topic(request):
    categories = Category.objects.filter(parent=None)
    serializer = CategoryDetailSerializer(categories, many=True)
    return Response(serializer.data)
# class CategoryListAPIView(ListAPIView):
#     queryset = Category.objects.all()
#     serializer_class = CategoryListTopicsSerializer

@api_view(['GET'])
def list_topics_of_categories(request):
    categories = Category.objects.all()
    serializer = CategoryListTopicsSerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_list_category_api_view(request):
    print(request)
    categories = Category.objects.filter(parent__isnull=True)
    if not categories:
        return Response({'detail': 'Category not found.'}, status=404)
    return Response({
        'ok': True,
        'data': CategorySerializer(categories, many=True).data
    })



# Get details
@api_view(['GET'])
@permission_classes([AllowAny])
def category_detail(request):
    # try:
    #     category = Category.objects.get(slug=category_slug)
    # except Category.DoesNotExist:
    #     return Response({'detail': 'Category not found.'}, status=404)
    #
    # if request.method == 'GET':
    #     serializer = CategorySerializer(category)
    #     return Response(serializer.data)
    # elif request.method == 'PUT':
    #     serializer = CategorySerializer(category, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=400)

    category_slug = request.GET.get('category_slug', '')
    try:
        category = Category.objects.get(slug=category_slug)
    except Category.DoesNotExist:
        return Response({
            'ok': False,
            'msg': "Category not found"
        }, status=200)
    # category = Category.objects.get(slug=category_slug)
    # subcategory = Category.objects.filter(parent=category)
    if not category:
        return Response({'detail': 'Category not found.'}, status=404)
    print(category)
    return Response({'ok': True, 'data': CategoryDetailSerializer(category).data})


@api_view(['GET'])
def sitemap(request):
    categories = Category.objects.filter(parent=None)
    serializer = CategoryBuildSitemapSerializer(categories, many=True)
    return Response(serializer.data)




