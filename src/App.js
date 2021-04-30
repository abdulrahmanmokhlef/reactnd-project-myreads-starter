import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'


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

  handleShelveChange(book, shelf){
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
  
  render() {
    debugger
    /**Set the shelves data*/
    const shelves = [
      {title:'Currently Reading', books: this.state.currentlyReadingList},
      {title:'Want to Read', books: this.state.wantToReadList},
      {title:'Read', books: this.state.readList}
    ];

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelves.map(shelve =>(
                  <BookShelf key={shelve.title} title={shelve.title} books={shelve.books} handleShelveChange={this.handleShelveChange.bind(this)}/>
                ))}
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
