import React from "react";

export const NotePanel = props => (
    <div className='panel panel-default'>
        <div className='panel-body'>
            {props.noteText}
            {props.children}
        </div>
    </div>
);
