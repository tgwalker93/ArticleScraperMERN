import React from "react";

export const NotePanel = props => (
    <div className='panel panel-default'>
        <div className='panel-body note-panel'>
            <p className="note-text"> {props.noteText} </p>
            {props.children}
        </div>
    </div>
);
