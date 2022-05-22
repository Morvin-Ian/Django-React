import React from 'react'

const Addbook = ({newBook, setNewBook,  newBookDesc, setNewBookDesc, handlesubmit}) => {
    return (
        <form className='form' onSubmit={handlesubmit}>
    
            <input

                autoFocus
                id='name'
                type='text'
                placeholder='Book Title'
                required
                value={newBook}
                onChange ={(e)=> setNewBook(e.target.value)}

            /> <br/>
            <textarea

                placeholder='Book Description'
                required
                value={newBookDesc}
                onChange ={(e)=> setNewBookDesc(e.target.value)}

            /> <br/>
            <button id='submit' type='submit'>Add Book</button>            
        </form>
    )
}

export default Addbook;
