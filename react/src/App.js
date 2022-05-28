import './index.css';
import {useState, useEffect} from 'react';
import Header from './Header';
import BookList from './BookList';
import Addbook from './Addbook';




function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState("");
  const [newBookDesc, setNewBookDesc] = useState("");
  const [showAdd, setShowAdd] = useState(false)
  const apiUrl = 'http://127.0.0.1:8000/api/book'



  useEffect(()=>{

      getBooks();

  },[])


  const getBooks = async () => {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setBooks(data);

  }


  const deleteBook = async (id) => {
      const listBooks = books.filter(book => book.id !== id);
      setBooks(listBooks)

      fetch(`${apiUrl}/delete/${id}`, {
        method: 'DELETE',
        'headers': {
            'Content-Type': 'application/json'
        }
    })
    }

    const addBook = async (book_name, description) => {
      const id = books.length ? books[books.length-1].id+1: 1;
      const newBook = {id, book_name, description };
      const listBooks = [...books, newBook]; 
  
      fetch(`${apiUrl}/create/`, {
            method: 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(newBook)
        })
    }


    const handlesubmit = (e) => {
      e.preventDefault();
      if (!newBook) return;
        addBook(newBook, newBookDesc)
        setNewBook('')
        setNewBookDesc('')
  
    }

  const handleview= () =>{
    setShowAdd(!showAdd)
  }
  

  return (
    
        <div className="App">

        <Header/>
        
        <button onClick={handleview}  id='toggle'>{showAdd ? 'Close': 'Add'}</button>

        {showAdd &&   <Addbook
          newBook={newBook}
          setNewBook ={setNewBook}
          newBookDesc={newBookDesc}
          setNewBookDesc={setNewBookDesc}
          handlesubmit ={handlesubmit}

        /> }
          
        {books.length ? 
             <BookList
             books={books}
             setBooks={setBooks}
             deleteBook={deleteBook}
 
           />:
           <h2>No Books</h2>
        }
          
        
      </div>
      
    
  );
}

export default App;
