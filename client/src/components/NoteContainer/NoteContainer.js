import React from "react";
import "./ArticlePanel.css";

export const NoteContainer = ({ children }) => (
    <div id="wrapper">
        <h1>NOTES</h1>
        <div id="articles">
            {children}
        </div>
        <div id="notes"></div>
    </div>
);
