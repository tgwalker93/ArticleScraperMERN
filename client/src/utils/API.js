import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  headlines: function () {
    return axios.get("/api/articles/getHeadlines");
  },
  saveArticle: function(article) {
    console.log("i'm in axios");
    console.log(article)
    return axios.post("/api/articles/saveArticle", article);
  },
  renderSavedArticles: function() {
    console.log("i'm in render saved articles");
    return axios.get("/api/articles/renderSavedArticles");
  },
  saveNote: function(note) {
    console.log("i'm in API");
    return axios.post("/api/articles/saveNote", note);
  },
  getNotes: function(article) {
    console.log("i'm in API front-end")
    return axios.get("/api/articles/getNotes", article)
  },
  deleteNote: function (note) {
    console.log("i'm in API front-end")
    console.log(note);
    return axios.delete("/api/articles/deleteNote/" + note._id);
  },
  deleteArticle: function(article) {
    console.log("I'm in API front-end") 
    console.log(article) 
    return axios.delete("/api/articles/deleteArticle/" + article._id);
  }
};
