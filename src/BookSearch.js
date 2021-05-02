import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Debounce } from 'react-throttle';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class BookSearch extends Component{
    static propTypes = {
        handleShelfChange: PropTypes.func.isRequired,
        allBooks: PropTypes.array.isRequired,
        tempImage: PropTypes.string.isRequired 
    };
    
    state = {
        books: []
    };

    search(event){
        debugger
        const {allBooks} = this.props;
       
        const query = event.target.value.trim();
        if(query === '') {
            this.clearBookList();
            return;    
        }

        BooksAPI.search(query).then(res =>{
            debugger
            if(!res || res.error ==="empty query" ){
                this.clearBookList();
                return; 
            }

            //set sheves of books on shelves to the books returnd from search
            res.forEach(book => {
                const shelvedBook = allBooks.find(book2 => book2.id === book.id);
                if(shelvedBook){
                    book.shelf = shelvedBook.shelf;
                }
            });
                
            this.setState(({
                books: res
            }));
        });

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
        const { tempImage } = this.props;
        return(
        <div className="search-books">
            <div className="search-books-bar">
               <Link to = "/">
                   <span className="close-search">
                        Close
                   </span>
                </Link> 
              
              <div className="search-books-input-wrapper">
                <Debounce time="1500" handler="onChange">
                    <input type="text" onChange = {this.search.bind(this)} placeholder="Search by title or author"/>
                </Debounce>
              </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {this.state.books.length > 0? (this.state.books.map(book =>(
                        <li key={book.id}>
                            <Book book = {book} 
                                  handleShelfChange = {this.handleShelfChange.bind(this)} 
                                  tempImage = {tempImage}/>    
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