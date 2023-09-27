from algoliasearch_django import AlgoliaIndex
from algoliasearch_django.decorators import register

from .models import Tag


@register(Tag)
class TagIndex(AlgoliaIndex):
    """Index for Tag model"""
    name = 'tags'
    fields = (
        'name',
        'slug'
    )
    settings = {
        'searchableAttributes': [
            'name',
            'slug'
        ],
        "queryType": "prefixAll"
    }

    index_name = "tags_index"
