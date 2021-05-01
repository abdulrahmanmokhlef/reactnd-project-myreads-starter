import React, {Component} from 'react';
import PropTypes from 'prop-types'


class Book extends  Component{
    static propTypes = {
        book: PropTypes.object.isRequired,
        handleShelfChange: PropTypes.func.isRequired,
        tempImage: PropTypes.string.isRequired 
    }


    render(){
        const { book , handleShelfChange, tempImage} = this.props;
        return(
            <div className="book">
                      <div className="book-top">
                        {book.imageLinks? (
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' +  book.imageLinks.smallThumbnail +')' }}></div>
                              ) : (
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' +  tempImage +')' }}></div>
                        )}                        
                        <div className="book-shelf-changer">
                          <select value={book.shelf? (book.shelf) : ('none')} onChange={(e)=>{handleShelfChange(book, e)}}>
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
        )
    }
}

export default Book;