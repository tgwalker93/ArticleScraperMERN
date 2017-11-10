import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Footer from "../../components/Footer";
import ArticlesContainer from "../../components/ArticlesContainer";
import ArticlePanel from "../../components/ArticlePanel";


class Articles extends Component {
    // Setting our component's initial state
    state = {
        books: [],
        title: "",
        author: "",
        synopsis: "",
        articles: [],
        savedArticlesTab: false
    };

    // When the component mounts, load all books and save them to this.state.books
    componentDidMount() {
        this.loadArticles();
    }

    // Loads all books  and sets them to this.state.books
    loadBooks = () => {
        API.getBooks()
            .then(res =>
                this.setState({ books: res.data, title: "", author: "", synopsis: "" })
            )
            .catch(err => console.log(err));
    };

    // Deletes a book from the database with a given id, then reloads books from the db
    deleteBook = id => {
        API.deleteBook(id)
            .then(res => this.loadBooks())
            .catch(err => console.log(err));
    };

    // Handles updating component state when the user types into the input field
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.title && this.state.author) {
            API.saveBook({
                title: this.state.title,
                author: this.state.author,
                synopsis: this.state.synopsis
            })
                .then(res => this.loadBooks())
                .catch(err => console.log(err));
        }
    };



 loadArticles = () => {
     API.headlines()
         .then(data =>
            this.setState({ articles: data.data.articles, title: "", author: "", synopsis: "" })
            // this.setState({ articles: data.articles, title: "", author: "", synopsis: "" })
         
         )
         .catch(err => console.log(err));
 };


 renderArticles(articles) {
    // This function handles appending HTML containing our article data to the page
    // We are passed an array of JSON containing all available articles in our database
    var articlePanels = [];
    // We pass each article JSON object to the createPanel function which returns a bootstrap
    // panel with our article data inside
    for (var i = 0; i < articles.length; i++) {
        articlePanels.push(this.createPanel(articles[i]));
    }
    // Once we have all of the HTML for the articles stored in our articlePanels array,
    // append them to the articlePanels container
    // articleContainer.append(articlePanels);
    return articlePanels;
}

saveArticle(title){

}

 renderEmpty() {
    // This function renders some HTML to the page explaining we don't have any articles to view
    // Using a joined array of HTML string data because it's easier to read/change than a concatenated string
    var emptyAlert = 
        [
            "<div class='alert alert-warning text-center'>",
            "<h4>Uh Oh. Looks like we don't have any new articles.</h4>",
            "</div>",
            "<div class='panel panel-default'>",
            "<div class='panel-heading text-center'>",
            "<h3>What Would You Like To Do?</h3>",
            "</div>",
            "<div class='panel-body text-center'>",
            "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
            "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
            "</div>",
            "</div>"
        ].join("")

    // Appending this data to the page
    // articleContainer.append(emptyAlert);
    return emptyAlert;
}


    render() {
        return (
            <Container fluid>
                <Row> 
                    <Jumbotron />
                </Row>
                <Row>
                    <Col size="md-12">
                    {this.state.savedArticlesTab ? (
                        <h3> Hello??? </h3>
                    ) : (

                    <ArticlesContainer>
                    {this.state.articles.length ? (
                        <div>
                        {this.state.articles.map(article => {
                            return (
                                <ArticlePanel key={article.title} title={article.title} link={article.link} summary={article.summary}>
                                    <SaveBtn onClick={() => this.saveArticle(article)} />
                                </ArticlePanel>
                            );
                        })}
                        </div>
                       )  : (
                          <h3> No Results to Display </h3> 
                      ) } 
                    </ArticlesContainer>
                

                            )}
    

                    </Col>
                </Row>
                <Row>
                    <Col size="md-12">
                    <Footer />
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default Articles;
