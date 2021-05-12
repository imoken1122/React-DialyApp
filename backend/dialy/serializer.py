from django.db.models import fields
from rest_framework import serializers
from django.utils import timezone
from .models import Dialy,Category,User
#from django.contrib.auth.models import User  
class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dialy
        fields = ("id","isOpen","created_date","published_date","title","text","category")

    #{"created_date":"2014-10-10T13:50:40Z","published_date":"2014-10-10T13:50:40Z","text": "aaa", "title": "aaa", "category": "aaa"}

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id","category")


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id","email","name","password")

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer #追加

#トークンを発行するためのクラス
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)


        # Add custom claims
        return token


