import React from "react";

const Nav = () =>
  // <nav className="navbar navbar-inverse navbar-top">
  //   <div className="container-fluid">
  //     <div className="navbar-header">
  //       <button type="button" className="collapsed navbar-toggle">
  //         <span className="sr-only">Toggle navigation</span>
  //         <span className="icon-bar" /> <span className="icon-bar" />
  //         <span className="icon-bar" />
  //       </button>
  //       <a href="/" className="navbar-brand">
  //         React Reading List
  //       </a>
  //     </div>
  //   </div>
  // </nav>;


  <nav className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="/">Mongo Scraper</a>
      </div>
      <ul className="nav navbar-nav">
        <li className="active"><a href="/">Home</a></li>
        <li><a href="/saved">Saved Articles</a></li>


        <li><a className="btn btn-danger scrape-new">SAVE ALL ARTICLES!</a></li>
      </ul>
    </div>
  </nav>

export default Nav;
