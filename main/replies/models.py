from django.db import models

from threads.models import Thread
from users.models import CustomUser


# Create your models here.
class Reply(models.Model):
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, related_name='replies')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='replies')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_solved = models.BooleanField(default=False)
    num_point = models.IntegerField(default=0)
    votes = models.ManyToManyField(CustomUser, blank=True, related_name='replies_voted')
    parent = models.ForeignKey(
            'self',
            on_delete=models.CASCADE,
            blank=True,
            null=True,
            related_name='children'
        )
    class Meta:
        verbose_name = 'Reply'
        verbose_name_plural = 'Replies'

    def __str__(self):
        return f"{self.thread.title}-{self.content[:100]}-{self.id}"