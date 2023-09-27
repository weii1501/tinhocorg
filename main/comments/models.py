from django.db import models
from articles.models import Articles
from threads.models import Thread
from users.models import CustomUser


# Create your models here.
class Comment(models.Model):
    article = models.ForeignKey(Articles, on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_solved = models.BooleanField(default=False)
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name='children'
    )

    class Meta:
        verbose_name = 'Comments'
        verbose_name_plural = 'Comments'

    def __str__(self):
        return f"{self.article.title}-{self.content[:100]}"
