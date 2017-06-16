// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");


// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query.
  runQuery: function(searchTerm) {

    console.log(searchTerm);

    var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

    // Search NYT Articles by subject
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    authKey + "&q=" + searchTerm;

    // year params  + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101"
    
    return axios.get(queryURL).then(function(response) {
      // If get get a result, return that result's formatted address property
      if (response.data.results[0]) {
        return response.data.results[0].formatted;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getHistory: function() {
    return axios.get("/api");
  },

  // !!!!!!!!!! This function posts new searches to our database. SHOULD THIS BE THE SEARCHTERM?!?!?!

  postHistory: function(searchTerm) {
    return axios.post("/api", { searchTerm: searchTerm });
  }
};

// We export the API helper
module.exports = helper;