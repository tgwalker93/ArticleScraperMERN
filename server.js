const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;

const MONGO_LOCAL_URL = 'mongodb://localhost:27017/mernarticlescraper'

// Connect to the Mongo DB
if (process.env.MONGODB_CONNECTION_STRING) {
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true});
} else {
  mongoose.connect(MONGO_LOCAL_URL, { useNewUrlParser: true }) // local mongo url
}

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function (error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function () {
  console.log("Mongoose connection successful.");
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
