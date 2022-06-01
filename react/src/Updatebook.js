import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Updatebook = (books, editBook, setEditBook, editBookDesc, setEditBookDesc, handleEdit) => {

  const AxiosBook = axios.create({
    baseURL: "http://127.0.0.1:8000/api"

  })

  const { id } = useParams()
  const arrayBooks = books["books"]
  const book = arrayBooks.find(book => (book.id).toString() === id)


  // useEffect(() => {

  //   if (book) {
  //     setEditBook(book.book_name)
  //     setEditBookDesc(book.description)
  //   }


  // }, [book, setEditBook, setEditBookDesc])

  // console.log(editBookDesc)



  return (


      <form className='form' onSubmit={() => handleEdit(book.id)}>
        <h3>{book.book_name}</h3>
       <small><p>{book.description}</p></small> 

        <input

          autoFocus
          id=''
          type='text'
          required 
          value={editBook}
          onChange ={(e)=> setEditBook(e.target.value)}

        /> <br />

        <textarea

          required
          value={editBookDesc}
          onChange ={(e)=> setEditBookDesc(e.target.value)}
        /> <br />

        <button id='submit' type='submit' >Update Book</button>
      </form>

  )
}

export default Updatebook;