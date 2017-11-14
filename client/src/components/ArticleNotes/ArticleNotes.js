import React from "react";
import "./ArticleNotes.css";
// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const ArticleNotes = props => (

    <a className="btn btn-info notes" {...props}>
        Article Notes
        </a>
);

export default ArticleNotes;