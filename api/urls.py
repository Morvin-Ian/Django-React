from django.urls import path
from . import views


from rest_framework.urlpatterns import format_suffix_patterns
from .views import BookList, BookDetail

urlpatterns = [
    
]



urlpatterns = [
    # Function based
    path('book/',views.Booksview, name='books'),
    path('book/<int:pk>/',views.Bookview, name='book'),
    path('book/create/',views.BookCreateview, name='book-create'),
    path('book/update/<int:pk>/',views.BookUpdateview, name='book-update'),
    path('book/delete/<int:pk>/',views.BookDeleteview, name='book-delete'),


    # Class based
    path('book/', BookList.as_view()),
    path('book/<int:pk>/', BookDetail.as_view()),

]

urlpatterns = format_suffix_patterns(urlpatterns)