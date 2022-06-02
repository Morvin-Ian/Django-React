import React from 'react'
import { Link } from 'react-router-dom'



const BookList = ({books, deleteBook}) => {

    return (
        <ul className='booklist'> 
      
            {books.map(book=>(
                <li key={book.id}> {book.book_name}
                          <button onClick={()=>deleteBook(book.id)} type='submit'>X</button>  <hr/>
                </li> 
        ))}
        <Link to="/add"><button id='submit'>Add Book</button></Link>
      
        </ul>
        
    )
}

export default BookList
