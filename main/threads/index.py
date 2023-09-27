from algoliasearch_django import AlgoliaIndex
from algoliasearch_django.decorators import register

from .models import Thread


@register(Thread)
class ThreadIndex(AlgoliaIndex):
    """Index for Thread model"""

    name = 'threads'
    fields = (
        'id',
        'title',
        'slug',
        'content',
        'created_at',
        'num_views',
        'tag_names',
        'infor_user'
    )
    settings = {
        'searchableAttributes': [
            'title',
            'content',
            'slug'
        ],
        "queryType": "prefixAll",
        "customRanking": [
            "desc(num_views)",
        ]
    }

    index_name = "threads_index"
