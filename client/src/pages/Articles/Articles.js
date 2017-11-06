import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Footer from "../../components/Footer";
import ArticlesContainer from "../../components/ArticlesContainer";
import ArticlePanel from "../../components/ArticlePanel";


class Books extends Component {
    // Setting our component's initial state
    state = {
        books: [],
        title: "",
        author: "",
        synopsis: "",
        articles: [],
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

 createPanel(article) {
    // This functiont takes in a single JSON object for an article/headline
    // It constructs a jQuery element containing all of the formatted HTML for the
    // article panel
    var panel =
        [
            "<div class='panel panel-default'>",
            "<div class='panel-heading'>",
            "<h3>",
            "<a class='article-link' target='_blank' href='" + article.link + "'>",
            article.title,
            "</a>",
            "<a class='btn btn-success save'>",
            "Save Article",
            "</a>",
            "</h3>",
            "</div>",
            "<div class='panel-body'>",
            article.summary,
            "</div>",
            "</div>"
        ].join("")

    // We attach the article's id to the jQuery element
    // We will use this when trying to figure out which article the user wants to save
    panel.data("id", article.id);
    // We return the constructed panel jQuery element
    return panel;
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
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>What Books Should I Read?</h1>
                        </Jumbotron>
                        <form>
                            <Input
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                name="title"
                                placeholder="Title (required)"
                            />
                            <Input
                                value={this.state.author}
                                onChange={this.handleInputChange}
                                name="author"
                                placeholder="Author (required)"
                            />
                            <TextArea
                                value={this.state.synopsis}
                                onChange={this.handleInputChange}
                                name="synopsis"
                                placeholder="Synopsis (Optional)"
                            />
                            <FormBtn
                                disabled={!(this.state.author && this.state.title)}
                                onClick={this.handleFormSubmit}
                            >
                                Submit Book
              </FormBtn>
                        </form>
                    </Col>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>Books On My List</h1>
                        </Jumbotron>
                        {this.state.books.length ? (
                            <List>
                                {console.log(this.state)}
                                {this.state.books.map(book => {
                                    return (
                                        <ListItem key={book._id}>
                                            <a href={"/books/" + book._id}>
                                                <strong>
                                                    {book.title} by {book.author}
                                                </strong>
                                            </a>
                                            <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        ) : (
                                <h3>No Results to Display</h3>
                            )}
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12">
                    
                    <ArticlesContainer>
                        {this.state.articles.map(article => {
                            return (
                                <ArticlePanel key={article.title} title={article.title} link={article.link} summary={article.summary}>
                                    
                                    <DeleteBtn onClick={() => this.deleteBook(article._id)} />
                                </ArticlePanel>
                            );
                        })}
                           


                    </ArticlesContainer>
                
    

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

export default Books;
