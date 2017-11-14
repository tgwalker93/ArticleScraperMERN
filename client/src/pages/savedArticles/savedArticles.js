import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn";
import ArticleNotes from "../../components/ArticleNotes";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Footer from "../../components/Footer";
import {ArticlesContainer, ArticlePanel} from "../../components/ArticlesContainer";


class savedArticles extends Component {
    state = {
        savedArticles: [],
    };
    componentDidMount() {
        this.loadSavedArticles();
    }
    loadSavedArticles() {
        API.renderSavedArticles()
            .then(data => {
                console.log("i'm in rendersaved then");
                console.log(data);
                console.log(data.data)
                this.setState({ savedArticles: data.data, title: "", author: "", synopsis: "" })

            }
                
            // this.setState({ articles: data.articles, title: "", author: "", synopsis: "" })

            )
            .catch(err => console.log(err));
    }

    deleteArticle() {
        console.log("i'm in deleteArticle");
        return (
            <Modal>
                <h1>Modal Content</h1>
                <p>Etc.</p>
            </Modal >
        )
    }
    ArticleNoteBootbox() {
        console.log("Article note bootbox is being called!");
        return (
            <Modal
                isOpen={true}
                contentLabel="Modal"
            >
                <h1>Modal Content</h1>
                <p>Etc.</p>
            </Modal>
        )
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Jumbotron />
                </Row>
                <Row>
                    <Col size="md-12">
                        {this.state.savedArticles.length ? (
                            <ArticlesContainer>
                                <div>
                                    {this.state.savedArticles.map(article => {
                                        return (
                                            
                                            <ArticlePanel key={article.title} title={article.title} link={article.link} summary={article.summary}>
                                                <div>
                                                <ArticleNotes onClick={() => this.ArticleNoteBootbox()} />

                                                <DeleteBtn onClick={() => this.deleteArticle()} />

                                                </div>

                                            </ArticlePanel>
                                        );
                                    })}
                                </div>
                            </ArticlesContainer>
                        ) : (
                                <h3> There are no saved articles! </h3>
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


export default savedArticles;