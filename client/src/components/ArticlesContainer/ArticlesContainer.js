import React from "react";

export const ArticlesContainer = ({children}) => (
    <div id="wrapper">
        <h1></h1>
        <div id="articles">
            {children}
        </div>
        <div id="notes"></div>
    </div>
);

// export default ArticlesContainer