from rest_framework import serializers
from django.utils import timezone
from .models import Dialy,Category
class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dialy
        fields = ("id","isOpen","created_date","published_date","title","text","category")

    #{"created_date":"2014-10-10T13:50:40Z","published_date":"2014-10-10T13:50:40Z","text": "aaa", "title": "aaa", "category": "aaa"}

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id","category")