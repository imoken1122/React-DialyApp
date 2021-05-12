from django.contrib import admin
from .models import Dialy,Category
from markdownx.admin import MarkdownxModelAdmin

from .models import User
from django.contrib.auth.admin import UserAdmin
from django.contrib import admin

admin.site.register(Dialy, MarkdownxModelAdmin)
admin.site.register(Category, MarkdownxModelAdmin)



admin.site.register(User)