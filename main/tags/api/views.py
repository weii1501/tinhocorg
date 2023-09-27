from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import TagSerializer

from tags.models import Tags

@api_view(['GET'])
@permission_classes([AllowAny])
def get_tags_list(request):
    queryset = Tags.objects.all()
    serializer = TagSerializer(queryset, many=True)
    return Response(serializer.data)