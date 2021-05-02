import React from 'react';
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

const BookShelf = (props)=>{
    
    //Update book shelve in the backend
    const handleShelfChange= (book, event) =>{
        const shelf = event.target.value;

        //if click on the current shelf do nothing.
        if(shelf === book.shelf)
            return;

        //update the book shelf in the backend    
        BooksAPI.update(book, shelf);
        props.handleShelfChange(book, shelf);
    }

    debugger
    const {title, books, tempImage} = props;
    return(
        <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
            {books.map(book => (
                <li key={book.id}>
                    <Book book = {book} handleShelfChange = {handleShelfChange.bind(this)} tempImage = {tempImage}/>    
                </li>
            ))}
            </ol>
        </div>
        </div>
    )
}

BookShelf.propsTypes = {
    title: PropTypes.string.isRequired,
    books : PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired,
    tempImage: PropTypes.string.isRequired 
};

export default BookShelf;