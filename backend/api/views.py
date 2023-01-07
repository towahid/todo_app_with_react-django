from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import TodoSerializer
from .models import Todo

# Create your views here.
@api_view(['GET'])
def todoList(request):
    todos=Todo.objects.all()
    serializer=TodoSerializer(todos,many=True)
    return Response(serializer.data)
@api_view(['GET'])
def singleTodo(request,pk):
    todo=Todo.objects.get(id=pk)
    serializer=TodoSerializer(todo,many=False)
    return Response(serializer.data)
@api_view(['POST'])
def todoCreate(request):
    serializer=TodoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
@api_view(['POST'])
def todoUpdate(request,pk):
    todo=Todo.objects.get(id=pk)
    serializer=TodoSerializer(instance=todo,data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
@api_view(['DELETE'])
def todoDelete(request,pk):
    todo=Todo.objects.get(id=pk)
    todo.delete()
    Response("todo delete successfully!")




