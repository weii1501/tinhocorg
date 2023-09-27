from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import StaticPage
# get data of static page
from .serializers import StaticPageSerializer

@api_view(['GET'])
def get_statics_page(request):
    page = request.GET.get('page')
    if page is None:
        page = 'home'
    try:
        static_page = StaticPageSerializer(StaticPage.objects.get(page_name=page))
        return Response(static_page.data)
    except StaticPage.DoesNotExist:
        return Response({'message': 'Page not found'}, status=404)