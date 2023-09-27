from rest_framework.response import Response
import re
from .models import CustomUser, CustomUserManager

def validate_request_data(func):

    def wrapper(request, *args, **kwargs):

        if not request:
            return Response({'detail': 'No data provided in the request.'}, status=400)
        
        email = request.data.get('email')
        username=request.data.get('username')

        if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
            return Response({'detail': 'Invalid email format.'}, status=400)
        
        if CustomUser.objects.filter(email=email).exists():
            return Response({'detail': 'User with this email already exists.'}, status=400)

        if CustomUser.objects.filter(username=username):
            return Response({'detail':'User with this user name already exists.'}, status=400)
        
        return func(request, *args, **kwargs)

    return wrapper

