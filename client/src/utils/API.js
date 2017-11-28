import axios from "axios";

export default {
  headlines: function () {
    return axios.get("/api/articles/getHeadlines");
  },
  bloomberg: function() {
    return axios.get("/api/articles/bloomberg");
  },
  saveArticle: function(article) {
    return axios.post("/api/articles/saveArticle", article);
  },
  renderSavedArticles: function() {
    return axios.get("/api/articles/renderSavedArticles");
  },
  saveNote: function(articleAndNote) {
    return axios.post("/api/articles/saveNote", articleAndNote);
  },
  getNotes: function(article) {
    return axios.get("/api/articles/getNotes/" + article._id)
  },
  deleteNote: function (note) {
    return axios.delete("/api/articles/deleteNote/" + note._id);
  },
  deleteArticle: function(article) {
    return axios.delete("/api/articles/deleteArticle/" + article._id);
  }
};
