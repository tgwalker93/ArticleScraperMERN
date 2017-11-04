import React from "react";

const ArticlesContainer = ({children}) => (
    <div id="wrapper">
        <h1>ARTICLES</h1>
        <div id="articles">
            {children}
        </div>
        <div id="notes"></div>
    </div>
);

export default ArticlesContainer