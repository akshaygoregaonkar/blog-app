from django.contrib import admin
from blog.models import BlogPost
# Register your models here.

class BlogAdmin(admin.ModelAdmin):
    exclude = ('slug',)
    list_display = ['id','title','category','date_created','thumbnail']
    ordering = ['date_created']
admin.site.register(BlogPost,BlogAdmin)

#
#
# class BlogPostAdmin(SummernoteModelAdmin):
#     exclude = ('slug', )
#     list_display = ('id', 'title', 'category', 'date_created')
#     list_display_links = ('id', 'title')
#     search_fields = ('title', )
#     list_per_page = 25
#     summernote_fields = ('content', )
#
# admin.site.register(BlogPost, BlogPostAdmin)
