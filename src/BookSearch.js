import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class BookSearch extends Component{
    static propTypes = {
        handleShelfChange: PropTypes.func.isRequired
    };
    
    state = {
        books: [],
        showSearchPage: false
    };

    componentDidMount(){
         this.timeout = null;
    }

    updateSate = ()=>{
        debugger
        this.setState({ showSearchPage: false})
        this.props.updateSate();
    };

    setTimeoutFunc = ()=>{
       
        
    }
    search(event){
        const self = this;
        //clear timeout every time search funcution is called 
        clearTimeout(self.timeout);

        const query = event.target.value.trim();
        if(query === '') {
            this.clearBookList();
            return;    
        }

        //set timeout to 1 second in order to start search right after the user stop typing.
        self.timeout = setTimeout(function () {
            debugger
            BooksAPI.search(query).then(res =>{
                debugger
                if(!res || res.error ==="empty query" ){
                    self.clearBookList();
                    return; 
                }
                    
                self.setState(({
                    books: res
                }));
            });
        }, 1000);
    }

    clearBookList(){
        this.setState(({
            books: []
        }));
    }

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
        return(
        <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={this.updateSate}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" onChange = {this.search.bind(this)} placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {this.state.books.length > 0? (this.state.books.map(book =>(
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
                    ))
                    ) : (
                        <div>No data found</div>
                    )}
                </ol>
            </div>
        </div>
        )
    }
}

export default BookSearch;