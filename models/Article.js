// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
     _id: Number, // Define _id explicitly as a Number,

    // title is a required string
    title: {
        type: String,
        required: true
    },
    // link is a required string
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: false
    },
    // issaved: {
    //     type: Boolean,
    //     default: false,
    //     required: true
    // },
    // This only saves one note's ObjectId, ref refers to the Note model
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
