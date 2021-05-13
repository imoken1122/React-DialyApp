from django.db.models import fields
from rest_framework import serializers as sz
from django.utils import timezone
from .models import Dialy,Category,User
from rest_framework_jwt.settings import api_settings
#from django.contrib.auth.models import User  



class GetFullUserSerializer(sz.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','name',"email")


class UserSerializerWithToken(sz.ModelSerializer):
    password = sz.CharField(write_only=True)
    token = sz.SerializerMethodField()
    def get_token(self, object):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(object)
        token = jwt_encode_handler(payload)
        return token
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
    class Meta:
        model = User
        fields = ('token', "email",'name', 'password')



class PostsSerializer(sz.ModelSerializer):
    user = UserSerializerWithToken()
    class Meta: 
        model = Dialy
        fields = "__all__"

    #{"created_date":"2014-10-10T13:50:40Z","published_date":"2014-10-10T13:50:40Z","text": "aaa", "title": "aaa", "category": "aaa"}

class CategorySerializer(sz.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
