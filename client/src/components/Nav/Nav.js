import React from "react";
import { Link } from "react-router-dom";

const Nav = () =>
  <nav className="navbar navbar-inverse navbar-fixed-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="/">MERN Stack Scraper</a>
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
          <Link to="/">New Articles</Link>
        </li>
      </ul>
    </div>
  </nav>

export default Nav;
