from django.urls import path
from blog import views

urlpatterns=[
    path('signIn/',views.signIn, name='signIn'),
    path('signUp/',views.signUp, name='signUp'),
    path('forgot_password/',views.forgot_password,name="forgot_password"),
    path('reset_password/',views.rest_password,name='rest_password'),
    path('blogs/',views.fetchAllBlog,name='fetch_all_blog'),
    path('blog/create',views.createBlog,name='create_blog'),
    path('user/blog/<int:id>',views.retrive_delete_update_blog,name='retrive_delete_update_blog'),
    path('blog/category/<str:category>',views.fetch_Blog_by_category,name='fetch_Blog_by_category'),
    path('hello/', views.HelloView.as_view(), name='hello'),
]