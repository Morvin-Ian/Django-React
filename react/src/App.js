import './index.css';

import Header from './Header';
import BookList from './BookList';
import Addbook from './Addbook';
import Updatebook from './Updatebook';


import axios from 'axios'
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'



function App() {
  const [books, setBooks] = useState([]);

  const [newBook, setNewBook] = useState("");
  const [newBookDesc, setNewBookDesc] = useState("");
  
  const [editBook, setEditBook] = useState("");
  const [editBookDesc, setEditBookDesc] = useState("");

  const apiUrl = 'http://127.0.0.1:8000/api/book'




  // axios

  const AxiosBook = axios.create({
    baseURL:"http://127.0.0.1:8000/api"

  })

 
  useEffect(()=> {

    const fetchBooks = async () =>{
      try{
        const response = await AxiosBook.get("/book")
        setBooks(response.data);

      }
      catch(err){
        if(err.response){

          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)}
        
        else{console.log(err.message)}

      }
    }

    fetchBooks();
  },[])




  // fetch

  useEffect(()=>{

    // getBooks();

  },[])


  const getBooks = async () => {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setBooks(data);

  }


  const deleteBook = async (id) => {
      const listBooks = books.filter(book => book.id !== id);
    

    //   fetch(`${apiUrl}/delete/${id}`, {
    //     method: 'DELETE',
    //     'headers': {
    //         'Content-Type': 'application/json'
    //     }
    // })

    // axios 
    const response = await AxiosBook.delete(`/book/delete/${id}/`)
      setBooks(listBooks)
    }

    const addBook = async (book_name, description) => {
      const id = books.length ? books[books.length-1].id+1: 1;
      const newBook = {id, book_name, description };
     
  
      // fetch(`${apiUrl}/create/`, {
      //       method: 'POST',
      //       'headers': {
      //           'Content-Type': 'application/json'
      //       },
      //       body:JSON.stringify(newBook)
      //   })

      // Axios

      try{
        await AxiosBook.post('/book/create/', newBook)
        const listBooks = [...books, newBook]; 
        setBooks(listBooks)
      }catch(err){
        console.log(err.message)

      }

    }


    const handlesubmit = (e) => {
      e.preventDefault();
      if (!newBook) return;
        addBook(newBook, newBookDesc)
        setNewBook('')
        setNewBookDesc('')
  
    }

    const bookEdit = async (book_name, description) => {
      const id = books.length ? books[books.length-1].id+1: 1;
      const updatedBook = {id, book_name:book_name, description:description}
      try{
        const response = await AxiosBook.put(`/book/update/${id}`, updatedBook)
        setBooks(books.map(book=> book.id === id ? {...response.data}:book))
        setEditBook('')
        setEditBookDesc('')
      }catch(err){
        console.log(err.message)
      }
    }

    const handleEdit = (e) => {
      e.preventDefault();
      if (!editBook) return;
        bookEdit(editBook, editBookDesc)
        setEditBook('')
        setEditBookDesc('')
  
    }
  
  

  return (
    
        <div className="App">

        <Router>
          <Header/>
          <Routes>

          <Route path='/' element= {
            books.length ? 
             <BookList
             
             books={books}
             setBooks={setBooks}
             deleteBook={deleteBook}
    
           />:
           <h2>No Books</h2>
        } />  

          <Route path="/add" element = {
          <Addbook
            newBook={newBook}
            setNewBook ={setNewBook}
            newBookDesc={newBookDesc}
            setNewBookDesc={setNewBookDesc}
            handlesubmit ={handlesubmit}

        />}/>

        <Route path='/update/:id' element={<Updatebook
            books={books}
            editBook={editBook}
            setEditBook={setEditBook}
            editBookDesc={editBookDesc}
            setEditBookDesc={setEditBookDesc}
            handleEdit={handleEdit}
        
          />}/>

      
        </Routes>
        </Router>  
        
        
      </div>
      
    
  );
}

export default App;
