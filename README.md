# MyReads appication
This is a book tracking application which allow users to select a book or multible books that they want
to read, further they can categorize their books in three shelves, each book has a dropdown list that
illustrates 4 options that enable the user to move books between shelves or even remove books from all 
shelves, the four options as follow:

* Currently Reading 
* Want to Read
* Read
* None  


## Installation instructions

* Open a terminal and cd to the project directory
* run `npm install` command to install all project dependenceies
* run `npm start` to start the application on the development server 


## Project Structure
The project is divided into 4 component:

* App.js which is the parent component for the BooKSearch, and BookShelf components 
* BooKSearch.js which resposible for seach page
* BookShelf.js which responsible for showing the shelves we have mentioned above
* Book.js which renders books


## Backend Server
[`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)
