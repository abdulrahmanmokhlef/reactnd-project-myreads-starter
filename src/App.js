import React from 'react';
import {Link, Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import tempImage from './imgs/temp.png'; // Tell webpack this JS file uses this image
import BookShelf from './BookShelf';
import BookSearch from './BookSearch';

class BooksApp extends React.Component {
  state = {
    currentlyReadingList: [],
    wantToReadList: [],
    readList: [],
    allBooks: []
  }

  componentDidMount(){
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
      let allBooks = data;
      this.setShelves(currentlyReading, wnatToRead, read, allBooks);
    });
  }
  
  /**
   * @description set shelve books when the app reloaded 
   * setShelves
   * @param {*} currentlyReading 
   * @param {*} wantToRead 
   * @param {*} read 
   */
   setShelves(currentlyReading, wantToRead, read, allBooks){
    this.setState(({
      currentlyReadingList: currentlyReading,
      wantToReadList: wantToRead,
      readList: read,
      allBooks: allBooks
    }))
  }

 /**
  * @description it fires when book shelf is changed and update shelves in all books
  * handleShelfChange
  * @param {*} book book objec
  * @param {*} shelf shelf name is a string value
  */
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

      // update allBook list with the updated books list  
      const allBooks = [...currentlyReadingList, ...wantToReadList, ...readList];

      this.setState(({
        currentlyReadingList: currentlyReadingList,
        wantToReadList: wantToReadList,
        readList: readList,
        allBooks: allBooks 
      }));
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
                  <BookShelf 
                    key={shelve.title} 
                    title={shelve.title} 
                    books={shelve.books} 
                    handleShelfChange={this.handleShelfChange.bind(this)}
                    tempImage = {tempImage}/>
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
            allBooks ={this.state.allBooks}
            tempImage ={tempImage}/>
        )}/>
        
      </div>
    )
  }
}

export default BooksApp
