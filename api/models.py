
from django.db import models

class Books(models.Model):
    book_name = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    update = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.book_name
