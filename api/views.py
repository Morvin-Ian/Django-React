from django.shortcuts import render
from django.http import HttpResponse

from .models import Books
from .serializers import BookSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authentication import SessionAuthentication,TokenAuthentication,BasicAuthentication
from rest_framework.permissions import IsAuthenticated


@api_view(["GET"])
def Booksview(request):
    try:
        books = Books.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    except Books.DoesNotExist:
        return HttpResponse(status=404)    
   
@api_view(["GET"])
def Bookview(request, pk):
    try:
        book = Books.objects.get(id=pk)
        serializer = BookSerializer(book, many=False)
        return Response(serializer.data)

    except Books.DoesNotExist:
        return HttpResponse(status=404)    

 
@api_view(["PUT"])
def BookCreateview(request):
    try:
        serializer = BookSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    except Books.DoesNotExist:
        return HttpResponse(status=404)    
   
@api_view(["GET", "PUT"])
def BookUpdateview(request, pk):
    try:
        book = Books.objects.get(id=pk)
        serializer = BookSerializer(instance=book,data = request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    except Books.DoesNotExist:
        return HttpResponse(status=404)    
   


@api_view(["GET", "DELETE"])
def BookDeleteview(request, pk):
    try:
        book = Books.objects.get(id=pk)
        book.delete()
        return Response("Delete Successful")

    except Books.DoesNotExist:
        return HttpResponse(status=404)    
   
