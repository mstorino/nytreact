// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require History Schema
var Article = require("./models/Article");

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://admin:codingrocks@ds023664.mlab.com:23664/reactlocate");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// ROUTES-------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
// This will get the articles we scraped from the mongoDB

app.get("/api", function(req, res) {
  // Grab every doc in the Articles array
  Article.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      
      res.render('articles', {
        //'articles is var looped over in articles.handlebars'
        articles:doc

      });
    }
  });
});

// //Get route to display saved articles
// app.get('/api/saved', function(req, res)  {
//   //Finds articles where saved is true
//   Article.find({ 'unsaved' : false }, function(err, doc) {
//     if (err) {
//       console.log(err);
//     }  else {
//       //Renders saved articles handlebars
//       res.render('saved', {
//         articles: doc
//       });
//     }
//   })
// });

// //Setting route to update an article to saved = true if user clicks "save article"
// app.post('/api/saved/:id', function(req, res)  {
//   Article.update({ '_id' : req.params.id }, { $set : { 'unsaved' : false }}, function(err, doc) {
//     res.redirect('/api');
//   })
// }); 

// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});