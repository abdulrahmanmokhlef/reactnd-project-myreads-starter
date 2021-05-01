import React, {Component} from 'react';
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class BookShelf extends Component{
    static propsTypes = {
        title: PropTypes.string.isRequired,
        books : PropTypes.array.isRequired,
        handleShelfChange: PropTypes.func.isRequired 
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
        const {title, books} = this.props;

        return(
            <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
               {books.map(book => (
                    <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+ book.imageLinks.smallThumbnail +')' }}></div>
                        <div className="book-shelf-changer">
                          <select value={book.shelf} onChange={(e)=>{this.handleShelfChange(book, e)}}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading" >Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      {book.authors? (book.authors.map(author =>(
                            <div key= {author} className="book-authors">{author}</div>
                          ))) : (
                            <div className="book-authors">Unknown Author!</div>
                          )}
                    </div>
                  </li>
               ))}
              </ol>
            </div>
          </div>
        )
    }
}

export default BookShelf;