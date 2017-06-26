// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var Saved = require("./children/Saved");


// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state

  getInitialState: function() {
    return { 
      searchTerm: "", 
      results: [], 
      savedArticles: [],
      clicks: 0,
      clickID: "Main" };
  },

  // The moment the page renders get Saved Article
  componentDidMount: function() {
    // Get the latest history.
    helpers.getSavedArticles().then(function(response) {
      console.log(response);
      if (response !== this.state.articles) {
        console.log("Article", response.data);
        this.setState({ savedArticles: response.data.docs.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...

  componentDidUpdate: function() {

    // Run the query for the article topic
    helpers.runQuery(this.state.searchTerm).then(function(data) {
      if (data !== this.state.results) {
        console.log("searchTerm", data);
        this.setState({ results: data });
      }
    }.bind(this));
  },

  // This function allows childrens to update the parent.
  setTerm: function(term) {
    this.setState({ searchTerm: term });
  },

  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">Article Finder!</h2>
            <p className="text-center">
              <em>Enter a topic to search.</em>
            </p>
          </div>

          <div className="col-md-6">

            <Form setTerm={this.setTerm} />

          </div>

          <div className="col-md-6">

            <Results 
              results={this.state.results} 
              clicks={this.state.clicks}
            />

          </div>

        </div>


      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;