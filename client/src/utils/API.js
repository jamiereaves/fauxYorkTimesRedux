import axios from "axios";
const keys = require("./keys");

export default {
  // Returns articles from the NYT API
  getArticles: function(keyword, start, end) {
    console.log(keys);
    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + keys.nyt.key + "&q=" + keyword + "&begin_date=" + start + "&end_date=" + end);
  },
  // Returns all saved articles from the db
  getSavedArticles: function() {
    return axios.get("/api/articles");
  },
  
  // Deletes the book with the given id
  deleteArticles: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves an article's data to the database
  saveArticle: function(articleData) {
    console.log(articleData);
    return axios.post("/api/articles", articleData);
  }
};
