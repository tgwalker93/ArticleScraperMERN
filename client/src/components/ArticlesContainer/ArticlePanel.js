import React from "react";

export const ArticlePanel = props => (
    <div className='panel panel-default'>
    <div className='panel-heading'>
    <h3>
    <a className='article-link' target='_blank' href={props.link}>
    {props.title}
    </a>
    {props.children}
    </h3>
    </div>
    <div className='panel-body'>
    {props.summary}
    </div>
    </div>
);

// export default ArticlePanel