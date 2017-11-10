import React from "react";

const ArticlesContainer = props => (
    <div className='panel panel-default'>
    <div className='panel-heading'>
    <h3>
    <a className='article-link' target='_blank' href='" + article.link + "'>
    {props.title},
    </a>
    <a className='btn btn-success save'>
    Save Article
    {props.article}
    </a>
    </h3>
    </div>
    <div className='panel-body'>
    {props.summary}
    </div>
    </div>
);

export default ArticlesContainer