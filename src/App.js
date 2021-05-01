import React from 'react';
import {Link, Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import BookSearch from './BookSearch';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    currentlyReadingList: [],
    wantToReadList: [],
    readList: [],
    showSearchPage: false
  }

  
  componentDidMount(){
    debugger
    this.getAllBooks();
  }

  /**
   * @description get all books from backend and call setSelves in side it, and  we will reused this function 
   * getAllBooks
   */
  getAllBooks(){
    BooksAPI.getAll().then(data =>{
      debugger
      let currentlyReading = data.filter(d => d.shelf ==='currentlyReading');
      let wnatToRead = data.filter(d => d.shelf ==='wantToRead');
      let read = data.filter(d => d.shelf ==='read');

      this.setShelves(currentlyReading, wnatToRead, read);
    });
  }
  
  /**
   * @description set shelve books when the app reloaded 
   * setShelves
   * @param {*} currentlyReading 
   * @param {*} wantToRead 
   * @param {*} read 
   */
   setShelves(currentlyReading, wantToRead, read){
    this.setState(({
      currentlyReadingList: currentlyReading,
      wantToReadList: wantToRead,
      readList: read
    }))
  }

  handleShelfChange(book, shelf){
      debugger
      let {currentlyReadingList, wantToReadList, readList}  = this.state;
      const originalBookShelf = book.shelf; 
      
      //Add book to selected shelf
      if(shelf ==='currentlyReading'){
        book.shelf = shelf;   //set the book to new shelf
        currentlyReadingList = currentlyReadingList.concat([book])
      }else if(shelf ==='wantToRead'){
        book.shelf = shelf;
        wantToReadList = wantToReadList.concat([book])
      }else if(shelf ==='read'){
        book.shelf = shelf;
        readList = readList.concat([book])
      }

      //Remove book form current shelf
      if(originalBookShelf ==='currentlyReading'){
        currentlyReadingList = currentlyReadingList.filter(b => b.id !== book.id)
      }else if(originalBookShelf ==='wantToRead'){
        wantToReadList= wantToReadList.filter(b => b.id !== book.id)
      }else if(originalBookShelf ==='read'){
        readList = readList.filter(b => b.id !== book.id)
      }

      this.setState(({
        currentlyReadingList: currentlyReadingList,
        wantToReadList: wantToReadList,
        readList: readList
      }));


     //this is altenative way to make changes appear on the home page but is will coast a server request 
     //this.getAllBooks();
    
  }
  
  updateSate = ()=> {
    this.setState(({
      showSearchPage: false
    }))
  }
  render() {
    /**Set the shelves data*/
    const shelves = [
      {title:'Currently Reading', books: this.state.currentlyReadingList},
      {title:'Want to Read', books: this.state.wantToReadList},
      {title:'Read', books: this.state.readList}
    ];

    return (
      <div className="app">
        
        <Route exact path="/" render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelves.map(shelve =>(
                  <BookShelf key={shelve.title} title={shelve.title} books={shelve.books} handleShelfChange={this.handleShelfChange.bind(this)}/>
                ))}
              </div>
            </div>
            
            <div className="open-search">
              <Link to="/search">
                <span >
                  Add a book
                </span>
              </Link>
            </div>
          </div>
        )}/>

        <Route path="/search" render = {()=>(
          <BookSearch 
            handleShelfChange = {this.handleShelfChange.bind(this)} 
            updateSate ={this.updateSate}/>
        )}/>
        
      </div>
    )
  }
}

export default BooksApp
