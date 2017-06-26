// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

const AUTHKEY = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

 //base query
const BASE = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=";

const PATH_QUERY = "&q=";

const URL = `${BASE}${AUTHKEY}${PATH_QUERY}`;



// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to the NYT API.
  runQuery: function(searchTerm) {

    console.log(searchTerm);

    const QUERYURL = `${URL}` + searchTerm;

    console.log(QUERYURL);

    return axios.get(QUERYURL).then(function(response) {
      // If get get a result, return that result's formatted address property
      if (response.data.response.docs) {
        return response.data.response.docs;
      }
      // If we don't get any results, return an empty string
      console.log("axios get error")
      return "";
    });
  },

// This function hits our own server to retrieve the record of query results
  getSavedArticles: function() {
    return axios.get("/api")
                .then(function(response){
                  return response
                });
  },

  saveClicks: function(clickData) {
    return axios.post("/api", clickData);
  }
  
 //  // This function posts new searches to our database.
 //  postSaved: function(article) {
 //    return axios.post("/api", article);
 //  },

 // deleteSaved: function(article) {
 //    return axios.post("/api/delete", article);
 //  }


  // // This function hits our own server to retrieve the record of query results
  // getHistory: function() {
  //   return axios.get("/api");
  // },

  // // This function posts new searches to our database.
  // postHistory: function(location) {
  //   return axios.post("/api", { location: location });
  // },

};

// We export the API helper
module.exports = helper;