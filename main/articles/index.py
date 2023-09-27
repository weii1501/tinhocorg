from algoliasearch_django import AlgoliaIndex
from algoliasearch_django.decorators import register

from .models import Articles

@register(Articles)
class ArticleIndex(AlgoliaIndex):
    """Index for Article model"""

    name = 'articles'
    fields = (
        'id',
        'title',
        'slug',
        'article_description',
        'created_at',
        'views',
        'num_views',
        'tag_names',
        'user',
        'infor_user'
    )
    settings = {
        'searchableAttributes': [
            'title',
            'article_description',
            'slug'
        ],
        "queryType": "prefixAll",
        "customRanking": [
            "desc(num_views)",
        ]
    }

    index_name = "articles_index"
