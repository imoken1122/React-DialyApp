from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.Posts ), #日報一覧
    path('posts/<int:pk>/', views.PostDetail), #1日の詳細
    path('posts/folder/<str:cat>/', views.CategoryDialy.as_view()), #カテゴリ別一覧
    path('post/new/', views.Posts), 
    path('getcat/',views.OPCategory),
    path('addcat/',views.OPCategory),
    path('rmcat/<int:pk>/',views.RmCategory),


    #path("post/<int:pk>/edit", views.EditDiary.as_view()),
    #path("post/<pk>/rm",views.RmDiary.as_view())
]