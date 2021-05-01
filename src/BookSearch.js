import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
        debugger
        const self = this;
        const {allBooks} = this.props;
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
                //this easiest way to iterate over and arrea

                res.forEach(book => {
                    debugger
                    const shelvedBook = allBooks.find(book2 => book2.id === book.id);
                    if(shelvedBook){
                        book.shelf = shelvedBook.shelf;
                    }
                });
                    
                self.setState(({
                    books: res
                }));
            });
        }, 500);
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
                <input type="text" onChange = {this.search.bind(this)} placeholder="Search by title or author"/>
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