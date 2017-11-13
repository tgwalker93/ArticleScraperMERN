import React from "react";
import "./SaveBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const SaveBtn = props => (

        <a className='btn btn-success save' {...props}>
            Save Article
        </a>

);

export default SaveBtn;
