import React from "react";
// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const ArticleNotes = props => (

    <a className="btn btn-info notes" {...props}>
        Article Notes
        {props.children}
        </a>
);

export default ArticleNotes;