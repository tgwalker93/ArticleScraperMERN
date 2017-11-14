import React from "react";
import "./DeleteBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const DeleteBtn = props => (

  <a className='btn btn-danger delete' {...props}>
  Delete From Saved
  </a>

);

export default DeleteBtn;
