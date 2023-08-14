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

//Notes Routes BEGIN ---------------------------------------------------------------

//DELETE A NOTE
app.delete("/deleteNote/:id", async (req, res) => {
    try {
      const deletedNote = await Note.findByIdAndDelete(req.params.id);
  
      if (!deletedNote) {
        return res.status(404).json({ error: "Note not found." });
      }
  
      res.json(deletedNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while deleting the note." });
    }
  });


//DELETE AN ARTICLE
app.delete("/deleteArticle/:id", async (req, res) => {
    try {
      const deletedArticle = await Article.findByIdAndDelete(req.params.id);
  
      if (!deletedArticle) {
        return res.status(404).json({ error: "Article not found." });
      }
  
      res.json(deletedArticle);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while deleting the article." });
    }
  });

//SAVE A NOTE
app.post("/saveNote", async (req, res) => {
    try {
      const noteData = {
        title: req.body.noteText,
        noteText: req.body.noteText,
      };
  
      const newNote = new Note(noteData);
      const savedNote = await newNote.save();
  
      await Article.findOneAndUpdate(
        { "_id": req.body._id },
        { $push: { "notes": savedNote._id } },
        { safe: true, upsert: true }
      );
  
      res.json(savedNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while saving the note." });
    }
  });


//SEARCH NOTES BY ARTICLE ID
app.get("/getNotes/:id", async (req, res) => {
    try {
      const article = await Article.findOne({ "_id": req.params.id })
        .populate("notes")
        .exec();
  
      if (!article) {
        return res.status(404).json({ error: "Article not found." });
      }
  
      res.json(article);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching notes." });
    }
  });

//NOTES END -----------------------------------------------------------


//ARTICLE ROUTES BEGIN -----------------------------------------------------


//RENDER SAVED ARTICLES
app.get("/renderSavedArticles", async (req, res) => {
    try {
      const articles = await Article.find({});
      res.json(articles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching saved articles." });
    }
  });

//SAVE ARTICLE FOR WHEN USER CLICKS SAVE
app.post("/saveArticle", async (req, res) => {
    var result = req.body;
    // Using our Article model, create a new entry
    // This effectively passes the result object to the entry (and the title and link)
    try {
        // Create a new entry using the Article model
        const entry = new Article(result);
    
        // Save the entry to the database
        const savedEntry = await entry.save();
    
        console.log(savedEntry);
        res.status(201).json(savedEntry); // Respond with the saved entry
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while saving the article." });
      }

});

//GET ALL THE BLOOMBERG HEADLINES (NOT IN USE) 
app.get("/bloomberg", async (req, res) => {
    console.log("I'm getting bloomberg headlines");
    // First, we grab the body of the html with request
    request("http://www.bloomberg.com", function (error, response, html) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(html);
            // Now, we grab every h2 within an article tag, and do the following:
            // Save an empty result object
            var result = {
                articles: []
            };
            $("article").each(function (i, element) {

                var article = {

                }
                // Add the text and href of every link, and save them as properties of the result object
                article.title = $(this).children("h2").text();
                article.link = $(this).children("h2").children("a").attr("href");
                article.summary = $(this).children(".summary").text();
                // article.issaved = false;
                article.id = i;
                if (article.title && article.link && article.summary) {
                    result.articles.push(article);
                }

            });


            res.json(result);


            //end of request
        }
    })
});

//GET ALL THE HEADLINES From the Nytimes
app.get("/getHeadlines", async (req, res) => {
    // First, we grab the body of the html with request
    request("https://www.nytimes.com/", function (error, response, html) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(html);

            // Now, we grab every h2 within an article tag, and do the following:
            // Save an empty result object
            var result = {
                articles: []
            };

            $("section").each(function (i, element) {
                
                var article = {

                }
                // Add the text and href of every link, and save them as properties of the result object
                article.title = $(this).find("h3").text();
                article.link = "https://www.nytimes.com" + $(this).find("a").attr("href");
                article.summary = $(this).find("p").text();
                article.isSaved = false;
                article.id = i;

                if(article.title && article.link && article.summary) {
                    result.articles.push(article);
                }

            });


            res.json(result);


            //end of request
        } 
    })

});

//Articles END ------------------------------------------------------





module.exports = app;