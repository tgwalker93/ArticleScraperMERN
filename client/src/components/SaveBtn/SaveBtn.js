import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const SaveBtn = props => (


    <div> 
        <a className='btn btn-success save' {...props}> Save Article   </a>
    
    </div>
);

export default SaveBtn;
