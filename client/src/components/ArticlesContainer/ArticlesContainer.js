import React from "react";

export const ArticlesContainer = ({children}) => (
    <div id="wrapper">
        <div id="articles">
            {children}
        </div>
        <div id="notes"></div>
    </div>
);

// export default ArticlesContainer