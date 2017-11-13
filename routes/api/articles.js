var path = require('path');
var request = require("request");
var express = require("express");
var app = express.Router();


//scraping tools
var request = require("request");
var cheerio = require("cheerio");


//models 
var Note = require("../../models/Note.js");
var Article = require("../../models/Article.js");

const router = require("express").Router();





// Routes
//==========================

//NOTES BEGIN ---------------------------------------------------------------
//SAVE A NEW NOTE
app.delete("/api/notes/:id", function (req, res) {
    Note.findByIdAndRemove(req.params.id, function (error, doc) {
        // Log any errors
        if (error) {
            console.log(error);
        }
        else {
            // Or send the document to the browser
            res.send(doc);
        }
    });

});
app.post("/api/notes", function (req, res) {
    // Create a new note and pass the req.body to the entry
    var newNote = new Note(req.body);

    // And save the new note the db
    newNote.save(function (error, doc) {
        // Log any errors
        if (error) {
            console.log(error);
        }
        // Otherwise
        else {
            // Use the article id to find and update it's note
            Article.findOneAndUpdate({ "_id": req.body.id }, { $push: { "notes": doc._id } },
                { safe: true, upsert: true })
                // Execute the above query
                .exec(function (err, doc) {
                    // Log any errors
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // Or send the document to the browser
                        res.send(doc);
                    }
                });
        }
    });

});

//SEARCH NOTES BY ARTICLE ID
app.get("/api/notes/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    Article.findOne({ "_id": req.params.id })
        // ..and populate all of the notes associated with it
        .populate("notes")
        // now, execute our query
        .exec(function (error, doc) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Otherwise, send the doc to the browser as a json object
            else {
                res.json(doc);
            }
        });
});
//NOTES END -----------------------------------------------------------


//HEADLINES BEGIN -----------------------------------------------------
app.post("/api/saveAllArticles", function (req, res) {
    var result = JSON.parse(req.body.articles);
    for (i = 0; i < result.length; i++) {
        // Using our Article model, create a new entry
        // This effectively passes the result object to the entry (and the title and link)
        var entry = new Article(result[i]);

        // Now, save that entry to the db
        entry.save(function (err, doc) {
            // Log any errors
            if (err) {
                console.log(err);
            }
            // Or log the doc
            else {
                console.log(doc);
            }
        });

    }

});
app.delete("/api/headlines/:id", function (req, res) {
    Article.findByIdAndRemove(req.params.id, function (error, doc) {
        // Log any errors
        if (error) {
            console.log(error);
        }
        else {
            // Or send the document to the browser
            res.send(doc);
        }
    })
}

)

//RENDER SAVED ARTICLES
app.get("/renderSavedArticles", function (req, res) {
    console.log("i'm in render saved on the back end");
    Article.find({}, function (error, doc) {
        // Log any errors
        if (error) {
            console.log(error);
        }
        // Or send the doc to the browser as a json object
        else {
            res.json(doc);
        }
    });
});

//SAVE ARTICLE FOR WHEN USER CLICKS SAVE
app.post("/saveArticle", function (req, res) {
    console.log("I'm in save article post")
    var result = req.body;
    console.log(result);
    // Using our Article model, create a new entry
    // This effectively passes the result object to the entry (and the title and link)
    var entry = new Article(result);

    // Now, save that entry to the db
    entry.save(function (err, doc) {
        // Log any errors
        if (err) {
            console.log("OHH NO I HAVE AN ERORR")
            console.log(err);
        }
        // Or log the doc
        else {
            console.log(doc);
        }
    });

});

//GET ALL THE HEADLINES
app.get("/getHeadlines", function (req, res) {
    console.log("I'm getting headlines");
    // First, we grab the body of the html with request
    request("http://www.nytimes.com/pages/todayspaper/index.html", function (error, response, html) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(html);
            // Now, we grab every h2 within an article tag, and do the following:
            // Save an empty result object
            var result = {
                articles: []
            };
            $(".story").each(function (i, element) {
                var article = {

                }
                // Add the text and href of every link, and save them as properties of the result object
                article.title = $(this).children("h3").text();
                article.link = $(this).children("h3").children("a").attr("href");
                article.summary = $(this).children("p").text();
                article.saved = false;
                article.id = i;
                result.articles.push(article);

            });


            res.json(result);


            //end of request
        }
    })

});

//HEADLINES END ------------------------------------------------------





module.exports = app;