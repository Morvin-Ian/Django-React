from django.shortcuts import render
from django.http import HttpResponse

from .models import Books
from .serializers import BookSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authentication import SessionAuthentication,TokenAuthentication,BasicAuthentication
from rest_framework.permissions import IsAuthenticated

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


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

 
@api_view(["GET","POST"])
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
   
class BookList(APIView):

    def get(self, request, format=None):
        books = Books.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BookDetail(APIView):

    def get_object(self, pk):
        try:
            return Books.objects.get(pk=pk)
        except Books.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        book = self.get_object(pk)
        serializer = BookSerializer(book)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        book = self.get_object(pk)
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        book = self.get_object(pk)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)