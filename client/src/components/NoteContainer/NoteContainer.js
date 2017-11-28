import React from "react";


export const NoteContainer = ({ children }) => (
    <div id="wrapper">
        <div id="articles">
            {children}
        </div>
        <div id="notes"></div>
    </div>
);
