from django.db import models
from django.db.models.fields import BooleanField
from markdownx.models import MarkdownxField
from django.utils import timezone
# Create your models here.
class Dialy(models.Model):
    created_date = models.DateTimeField(default=timezone.now) # 日付と時間のフィールド
    published_date = models.DateTimeField(blank=True, null=True)
    category = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    text = MarkdownxField()
    isOpen = BooleanField()


    def __str__(self):
        return self.title
        
class Category(models.Model):
    category = models.CharField(max_length=20)
