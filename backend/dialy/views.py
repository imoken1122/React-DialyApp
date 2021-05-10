from django.db.models import manager
from django.shortcuts import render
from django.views.decorators import csrf
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets, filters
from django.utils import timezone
from .models import Category, Dialy 
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from . import serializer 

@csrf_exempt
def Posts(request):
    if request.method == "GET":
        posts = Dialy.objects.filter(isOpen="True").order_by('-created_date')
        sl = serializer.PostsSerializer(posts, many = True)
        return JsonResponse(sl.data,safe=False)

    elif request.method == "POST":

        data = JSONParser().parse(request)
        sl = serializer.PostsSerializer(data=data)
        if sl.is_valid():
            sl.save()
            print(sl.data)
            return JsonResponse(sl.data,status = 201)
        return JsonResponse(sl.errors, status=400)
 
    #elif request.method == "DELETE":


@csrf_exempt
def PostDetail(request,pk):
    try:
        post = Dialy.objects.get(id = pk)
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
def OPCategory(request):
    if request.method == "GET":
        cat_list = Category.objects.all()
        print(cat_list)
        sl = serializer.CategorySerializer(cat_list, many = True)
        return JsonResponse(sl.data,safe=False)

    elif request.method == "POST":
        print(request)
        data = JSONParser().parse(request)
        sl = serializer.CategorySerializer(data=data)
        if sl.is_valid():
            sl.save()
            print(sl.data)
            return JsonResponse(sl.data,status = 201)
        return JsonResponse(sl.errors, status=400)

@csrf_exempt
def RmPutCategory(request,pk):
    try:
        cat = Category.objects.get(id = pk)
        print(cat)
    except  Category.DoesNotExist:
        return HttpResponse(status=404) 
    if request.method == "DELETE":
        cat.delete()

        dialy = Dialy.objects.filter(category=cat.category)
        dialy.delete()
        return HttpResponse(status = 204) 
    elif request.method == "PUT":
        data = JSONParser().parse(request)
        sl = serializer.CategorySerializer(cat,data=data)
        if sl.is_valid():
            sl.save()
            return JsonResponse(sl.data)
        return JsonResponse(sl.errors, status=400)

class DetailDialy(APIView):
    def get(self,request,pk):
        try:
            try:
                d = Dialy.objects.get(id=pk)
            except:
                return Response("記事が存在しません",status=status.HTTP_404_NOT_FOUND)

            res = {
                "id":d.id,
                "date":d.published_date,
                "title":d.title,
                "text":d.text,

            }
            return Response(res)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class ListDiary(APIView):
    def get(self,request):
        try:
            dialy = Dialy.objects.filter(published_date__lte=timezone.now()).order_by('-published_date')
            res_list =[
                {
                    "id":d.id,
                    "date":d.published_date,
                    "title":d.title,
                    "folder":d.category

                }
                for d in dialy
            ]
            return Response(res_list)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CategoryDialy(APIView):
    def get(self,request,cat):
        try:
            dialy = Dialy.objects.filter(isOpen="True",category=cat).order_by('-published_date')
            res_list =[
                {
                    "id":d.id,
                    "published_date":d.published_date,
                    "title":d.title,
                    "category":d.category

                }
                for d in dialy
            ] 
            return Response(res_list)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CategoryName(APIView):
    def get(self,request):
        try:
            cat_list = sorted(set(Dialy.objects.values_list("category",flat = True)))
            res_list = [
                {"category":d} for d in cat_list
                ]
            return Response(res_list)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)



