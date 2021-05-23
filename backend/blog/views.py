
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
# from rest_framework.authtoken.admin import User,Token
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from blog.serilaizer import UserSerializers, BlogPostserializers
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView,ListCreateAPIView,RetrieveAPIView
from blog.models import BlogPost
from  rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(["POST"])
def signUp(request):
    password=request.data['password']
    print(request.data)
    serializer=UserSerializers(data={**request.data})
    # serializer = UserSerializers(data={**request.data, "password": make_password(password)})
    if serializer.is_valid():
        user = User.objects.create(**request.data)
        user.set_password(password)
        user.save()
        # serializer.save()

        newuser=User.objects.last()
        # token,_=Token.objects.get_or_create(user_id=user.id)
        token=RefreshToken.for_user(newuser)

        response_serializer=UserSerializers(newuser)
        return Response(data={'id':user.id,'username':user.username,'email':user.email,'first_name':user.first_name,'last_name':user.last_name,'token':str(token.access_token)})
    else:
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def signIn(request):
    username=request.data['username']
    password=request.data['password']

    try:
        user = User.objects.get(username=username)
        # print(user)
        if user:
            print(user)
            if user.check_password(password):
                # token, _ = Token.objects.get_or_create(user_id=user.id)
                token = RefreshToken.for_user(user)


                return Response(data={'id':user.id,'username': user.username, 'email': user.email, 'first_name': user.first_name,
                                      'last_name': user.last_name, 'token': str(token.access_token)})
            else:
                return Response(data={'message': 'Password is Incorrect'},status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(data={'message': "User with this Username  doesn't exist"}, status=status.HTTP_401_UNAUTHORIZED)
    except:
        return Response(data={'message': "User with this Username  doesn't exist"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def rest_password(request):
    username = request.data['username']
    password = request.data['password']
    newpassword=request.data['newpassword']

    user = User.objects.get(username=username)
    if user:
        if user.check_password(password):
            user.set_password(newpassword)
            user.save()
            return Response(data={'message':"Password is Reset Successfully"})
        else:
            return Response(data={'message':" Old Password doesn't Match!"},status=status.HTTP_401_UNAUTHORIZED)






@api_view(['POST'])
def forgot_password(request):
    username = request.data['username']
    email=request.data['email']
    newpassword=request.data['newpassword']
    try:
        user = User.objects.get(username=username, email=email)
        if user:
            user.set_password(newpassword)
            user.save()
            return Response(data={'message': "Password is Set Successfully"})
        else:
            return Response(data={'message': "User doesn't exist"},status=status.HTTP_401_UNAUTHORIZED)
    except:
        return Response(data={'message': "User doesn't exist"}, status=status.HTTP_401_UNAUTHORIZED)
        # return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
# @authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetchAllBlog(request):
    all_blog = BlogPost.objects.all()
    response_blog_serializer = BlogPostserializers(all_blog, many=True)
    return Response(data=response_blog_serializer.data)


@api_view(['GET'])
# @authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_Blog_by_category(request,category):
    if category=='all':
        blogs = BlogPost.objects.all()
    else:
        blogs = BlogPost.objects.filter(category=category)
    response_blog_serializer = BlogPostserializers(blogs,many=True)
    return Response(data=response_blog_serializer.data)



@api_view(['POST'])
# @authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def createBlog(request):
    serializer = BlogPostserializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        created_blog = BlogPost.objects.last()
        response_blog = BlogPostserializers(created_blog)
        return Response(data=response_blog.data)
    else:
        return Response(data=serializer.errors, status=400)



@api_view(['GET','PUT','DELETE'])
# @authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def retrive_delete_update_blog(request,id):
    if request.method=="GET":
        blog=BlogPost.objects.get(id=id)
        serializer=BlogPostserializers(blog)
        return Response(data=serializer.data)
    elif request.method=='DELETE':
        blog = BlogPost.objects.get(id=id)
        blog.delete()
        return Response(data={'message': "Blog Deleted Successfully"})
    elif request.method=='PUT':
        blog = BlogPost.objects.get(id=id)
        serializer=BlogPostserializers(data=request.data,instance=blog)
        if serializer.is_valid():
            serializer.save()
            updated_blog=BlogPost.objects.get(id=id)
            response_blog = BlogPostserializers(updated_blog)
            return Response(data=response_blog.data)
        else:
            return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)




class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)