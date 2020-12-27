from django.db import models


class Todo(models.Model):
    year = models.IntegerField()
    month = models.IntegerField()
    date = models.IntegerField()
    title = models.TextField()
    content = models.TextField()
