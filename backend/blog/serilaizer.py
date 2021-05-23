from rest_framework import serializers
# from rest_framework.authtoken.admin import User
from django.contrib.auth.models import User
from rest_framework.validators import UniqueTogetherValidator, UniqueValidator
from blog.models import BlogPost


class UserSerializers(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False)
    username = serializers.CharField(required=True, validators=[UniqueValidator(
        queryset=User.objects.all(), message="Username already exist")])
    email = serializers.EmailField(validators=[UniqueValidator(
        queryset=User.objects.all(), message="Email already exist")])
    password = serializers.CharField(min_length=6, required=True, write_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model=User
        fields=['id','first_name','last_name','username',"email","password","isAdmin"]
    def get_first_name(self, obj):
        return obj.username.capitalize()

    def get_isAdmin(self, obj):
        return obj.is_staff




class BlogPostserializers(serializers.ModelSerializer):
    user_details =UserSerializers(source='user', read_only=True)
    class Meta:
        model=BlogPost
        # fields='__all__'
        fields=['id', 'title', "category", 'thumbnail', "excerpt", 'date', 'content', 'featured', 'date_created','user','user_details']
    # class Meta:
    #     model:BlogPost
    #     # fields=['id','title','category','thumbnail','month','day','content','date_created','user']
    #     fields='__all__'
