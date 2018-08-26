import axios from "axios";

export default {
  // Returns articles from the NYT API
  getArticles: function(keyword, start, end) {
    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=APIKEYAPIKEYAPIKEYAPIKEY&q=" + keyword + "&begin_date=" + start + "&end_date=" + end);
  },
  // Returns all saved articles from the db
  getSavedArticles: function() {
    return axios.get("/api/savedArticles");
  },
  
  // Deletes the book with the given id
  deleteArticles: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves an article's data to the database
  saveArticle: function(articleData) {
    return axios.post("/api/savedArticles", articleData);
  }
};
