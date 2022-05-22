import React from 'react'



const BookList = ({books, deleteBook}) => {

    return (
        <ul className='booklist'> 
      
            {books.map(book=>(
                <li key={book.id}>{book.book_name} 
            
                <button
                    onClick={()=> deleteBook(book.id)}       
                >X</button></li> 
        ))}
        
      
        </ul>
        
    )
}

export default BookList
