from rest_framework import serializers
from users.serializers import CustomUserRepliesSerializer
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    children= serializers.SerializerMethodField()

    def get_children(self, obj):
        children=obj.children.order_by("-created_at")
        serializer = self.__class__(children, many=True)
        return serializer.data
    user=CustomUserRepliesSerializer()
    class Meta:
        model= Comment
        fields='__all__'