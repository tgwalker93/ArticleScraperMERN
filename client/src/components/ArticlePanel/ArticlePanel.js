import React from "react";

const ArticlesContainer = props => (
    <div class='panel panel-default'>,
    <div class='panel-heading'>,
    <h3>,
    <a class='article-link' target='_blank' href='" + article.link + "'>
    {props.title},
    </a>
    <a class='btn btn-success save'>
    {props.article}
    </a>
    </h3>
    </div>
    <div class='panel-body'>
    {props.summary}
    </div>
    </div>
);

export default ArticlesContainer