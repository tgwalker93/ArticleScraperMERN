import React from "react";
import "./SaveBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const SaveBtn = props => (
    <span className="delete-btn" {...props}>
        <a class='btn btn-success save'> 
            Save Article
        </a>
  </span>
);

export default SaveBtn;
