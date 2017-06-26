// Include React
var React = require("react");

// Creating the Results component
var Results = React.createClass({

  // Whenever our component updates, the code inside componentDidUpdate is run
  componentDidUpdate: function(prevState) {
    console.log("COMPONENT UPDATED");

    // We will check if the click count has changed...
    if (prevState.clicks !== this.props.clicks) {

      // If it does, then update the clickcount in MongoDB
     helpers.saveClicks({ clickID: this.props.clickID, clicks: this.props.clicks })
        .then(function() {
          console.log("Posted to MongoDB");
        });
    }
  },

  handleClick: function() {
    this.setState({ clicks: this.props.clicks + 1 });
  },

  // Here we render the function
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body text-center">
          <h1>Article:</h1>

          {this.props.results ? this.props.results.map(function(article, i) {
            return(
              <div>
              <p key={i}>{article.headline.main}</p>
                <button
                className="btn btn-primary btn-lg"
                type="button"
                onClick={this.handleClick}
              >
                CLICK ME!!!!
              </button>
             </div>
            )
          }.bind(this)) : <p>Loading...</p>}
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;

              