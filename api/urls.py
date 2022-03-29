from django.urls import path
from . import views

urlpatterns = [
    path('book/',views.Booksview, name='books'),
    path('book/<int:pk>/',views.Bookview, name='book'),
    path('book/create/',views.BookCreateview, name='book-create'),
    path('book/update/<int:pk>/',views.BookUpdateview, name='book-update'),
    path('book/delete/<int:pk>/',views.BookDeleteview, name='book-delete')

]