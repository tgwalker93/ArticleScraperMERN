import React from "react";

const Jumbotron = ({ children }) =>
  // <div style={{ height: 300 }} className="jumbotron">
  //   {children}
  // </div>;

  <div className="jumbotron text-center">
    <div className="overlay">
    </div>
    <div className="background-image">
    </div>
    <div className="caption">
      <h1>Mongo Scraper</h1>
      <p>New York Times Edition</p>
    </div>
  </div>


export default Jumbotron;
