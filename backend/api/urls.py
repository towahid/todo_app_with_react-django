from django.urls import path
from . views import *

urlpatterns = [
    path('list/',todoList,name='todo-list'),
    path('detail/<str:pk>/',singleTodo,name='todo-detail'),
    path('create/',todoCreate,name='todo-create'),
    path('update/<int:pk>/',todoUpdate,name='todo-update'),
    path('delete/<int:pk>/',todoDelete,name='todo-delete'),

]