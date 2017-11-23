import React from "react";
import Articles from "../../pages/Articles"
import { Link } from "react-router-dom";

const Nav = () =>
  <nav className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="/">Mongo Scraper</a>
      </div>
      <ul className="nav navbar-nav">
        <li
          className={window.location.pathname === "/saved" ? "active" : ""}
        >
          <Link to="/saved">Saved Articles</Link>
        </li>
        <li
          className={window.location.pathname === "/" ? "active" : ""}
        >
          <Link to="/">Home</Link>
        </li>
        {/* <li className="active"><a href="/">Home</a></li> */}
        {/* <li><a href="/save">Saved Articles</a></li> */}


        <li><a className="btn btn-danger scrape-new">SAVE ALL ARTICLES!</a></li>
      </ul>
    </div>
  </nav>

export default Nav;
