from django.contrib import admin
from .models import Dialy,Category
from markdownx.admin import MarkdownxModelAdmin

admin.site.register(Dialy, MarkdownxModelAdmin)
admin.site.register(Category, MarkdownxModelAdmin)
# Register your models here.
