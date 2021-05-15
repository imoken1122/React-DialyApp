from django.db.models import manager
from django.shortcuts import render
from django.views.decorators import csrf
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets, filters
from django.utils import timezone
from .models import Category, Dialy ,User
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import permission_classes,authentication_classes,api_view
from rest_framework.parsers import JSONParser
from . import serializer 
from django.contrib.auth.hashers import make_password 
from rest_framework.permissions import IsAuthenticated  
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response
from rest_framework import permissions, status #追加
from rest_framework_jwt.authentication import JSONWebTokenAuthentication #追加


@csrf_exempt
@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def Posts(request,userid=None):

    print(userid)
    if request.method == "GET":

        posts = Dialy.objects.filter(isOpen="True",user=userid).order_by('-created_date')
        sl = serializer.PostsSerializer(posts, many = True).data
        return JsonResponse(sl,safe=False)

    if request.method == "POST":
        data = JSONParser().parse(request)
        sl = serializer.PostsSerializer(data=data)
        if sl.is_valid():
            sl.save()
            print(sl.data)
            return JsonResponse(sl.data,status = 201)
        print(sl.errors)
        return JsonResponse(sl.errors, status=400)

    #elif request.method == "DELETE":


@csrf_exempt
@api_view(["GET",'POST',"PUT","DELETE"])
@permission_classes([IsAuthenticated])
def PostDetail(request,pk,userid=None):
    try:
        post = Dialy.objects.get(id = pk,user=userid)
    except  Dialy.DoesNotExist:
        return HttpResponse(status=404)

    if request.method =="GET":
        sl = serializer.PostsSerializer(post)
        return JsonResponse(sl.data)
    elif request.method == "PUT" :
        data = JSONParser().parse(request)
        sl = serializer.PostsSerializer(post,data=data)
        if sl.is_valid():
            sl.save()
            print(sl.data)
            return JsonResponse(sl.data)
        return JsonResponse(sl.errors, status=400)

    elif request.method == "DELETE":
        post.delete()
        return HttpResponse(status = 204)
@csrf_exempt
@api_view(['GET',"POST"])
@permission_classes([IsAuthenticated])
def OPCategory(request,userid):
    if request.method == "GET":
        cat_list = Category.objects.filter(user = userid)
        sl = serializer.CategorySerializer(cat_list, many = True)
        return JsonResponse(sl.data,safe=False)

    elif request.method == "POST":
        data = JSONParser().parse(request)
        sl = serializer.CategorySerializer(data=data)
        if sl.is_valid():
            sl.save()
            return JsonResponse(sl.data,status = 201)
        print(sl.errors)
        return JsonResponse(sl.errors, status=400)

@csrf_exempt
@api_view(['GET',"PUT","DELETE"])
@permission_classes([IsAuthenticated])
def RmPutCategory(request,pk,userid):
    try:
        cat = Category.objects.get(id = pk,user = userid)
    except  Category.DoesNotExist:
        return HttpResponse(status=404) 
    if request.method == "DELETE":
        cat.delete()

        dialy = Dialy.objects.filter(category=cat.category,user=userid)
        dialy.delete()
        return HttpResponse(status = 204) 
    elif request.method == "PUT":
        data = JSONParser().parse(request)
        sl = serializer.CategorySerializer(cat,data=data)
        if sl.is_valid():
            sl.save()
            return JsonResponse(sl.data)
        return JsonResponse(sl.errors, status=400)
"""
@csrf_exempt
def SignUp(request):
    if request.method == "POST":

        data = JSONParser().parse(request)
        print(data)
        data["password"]=make_password(data["password"])
        sl = serializer.SignUpSerializer(data=data)

        if sl.is_valid():
            print(1)
            sl.save()
            return JsonResponse(sl.data,status = 201)
        return JsonResponse(sl.errors, status=400)
"""

class CategoryDialy(APIView):

    permission_classes = [IsAuthenticated]
    def get(self,request,cat,userid):

        try:
            dialy = Dialy.objects.filter(isOpen="True",category=cat, user=userid).order_by('-published_date')
            print(dialy,cat)
            res_list =[
                {
                    "id":d.id,
                    "created_date":d.created_date,
                    "title":d.title,
                    "category":d.category

                }
                for d in dialy
            ] 
            return Response(res_list)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class SignUp(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self,request):
        user = request.data
        if not user:
            return Response({'response' : 'error', 'message' : 'No data found'})
        sl = serializer.UserSerializerWithToken(data = user)
        if sl.is_valid():
            saved_user = sl.save()
        else:
            return Response({"response" : "error", "message" : sl.errors})
        return Response({"response" : "success", "message" : "user created succesfully"})
