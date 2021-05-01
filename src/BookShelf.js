import React, {Component} from 'react';
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BookShelf extends Component{
    static propsTypes = {
        title: PropTypes.string.isRequired,
        books : PropTypes.array.isRequired,
        handleShelfChange: PropTypes.func.isRequired,
        tempImage: PropTypes.string.isRequired 
    };

    //Update book shelve in the backend
    handleShelfChange(book, event) {
        const shelf = event.target.value;

        //if click on the current shelf do nothing.
        if(shelf === book.shelf)
            return;

        //update the book shelf in the backend    
        BooksAPI.update(book, shelf);
        this.props.handleShelfChange(book, shelf);
    }

    render(){
        debugger
        const {title, books, tempImage} = this.props;
        return(
            <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
               {books.map(book => (
                    <li key={book.id}>
                        <Book book = {book} handleShelfChange = {this.handleShelfChange.bind(this)} tempImage = {tempImage}/>    
                    </li>
               ))}
              </ol>
            </div>
          </div>
        )
    }
}

export default BookShelf;