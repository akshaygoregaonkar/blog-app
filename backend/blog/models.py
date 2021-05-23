from django.db import models
from datetime import datetime
# from rest_framework.authtoken.admin import User
from django.contrib.auth.models import User


class Categories(models.TextChoices):
    WORLD = 'world'
    ENVIRONMENT = 'environment'
    TECHNOLOGY = 'technology'
    DESIGN = 'design'
    CULTURE = 'culture'
    BUSINESS = 'business'
    POLITICS = 'politics'
    OPINION = 'opinion'
    SCIENCE = 'science'
    HEALTH = 'health'
    STYLE = 'style'
    TRAVEL = 'travel'



class BlogPost(models.Model):
    title = models.CharField(max_length=50,null=True,blank=True)
    category  = models.CharField(max_length=50, choices=Categories.choices, default=Categories.WORLD)
    thumbnail = models.ImageField(upload_to='photos/%Y/%m/%d/',null=True,blank=True)
    excerpt = models.CharField(max_length=150)
    date = models.TextField(null=True,blank=True)
    # day = models.CharField(max_length=2,null=True,blank=True)
    content = models.TextField(null=True,blank=True)
    featured = models.BooleanField(default=False)
    date_created = models.DateTimeField(default=datetime.now, blank=True )
    user=models.ForeignKey(User,on_delete=models.CASCADE)


    def __str__(self):
        return self.title
#
# class UserProfile(models.Model):
#     profile_picture=models.ImageField()