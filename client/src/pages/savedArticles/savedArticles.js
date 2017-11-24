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
import { NoteContainer, NotePanel } from "../../components/NoteContainer";
import "./savedArticles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class savedArticles extends Component {
    state = {
        savedArticles: [],
        isModalOpen: false,
        articleNote: "",
        savedArticleNotes: {
            
        },
        currentArticle: null,
        currentArticleNotes: null

    };
    componentDidMount() {
        this.loadSavedArticles();
        Modal.setAppElement('body');
    }

    openModal(article, e) {
        console.log("openModal was called");
        console.log(article)
        console.log(e)
        this.setState({isModalOpen: true, currentArticle: article});
        this.renderArticleNotes(article)
    }
    closeModal() {
        this.setState({ isModalOpen: false });
    }
    // Handles updating component state when the user types into the input field
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    
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


    addArticleNote() {
        console.log("I've entered addArticleNote()")
        console.log(this.state.articleNote);
        let articleNote =  {
            noteText: this.state.articleNote
        }
        if (this.state.articleNote) {
            API.saveNote(articleNote)
                .then(res => this.renderArticleNotes(this.state.currentArticle))
                .catch(err => console.log(err));
        }

    };
    renderArticleNotes(article) {
        console.log("I've successfully made it to renderArticleNotes!!!")
        API.getNotes(article)
            .then(res => {
                console.log("I've successfully completed API.getNotes in renderArticleNotes, here is the notes");
                console.log(res.data.notes)
                this.setState({
                    currentArticleNotes: res.data.notes
                })
            })
            .catch(err => console.log(err));
    }

    deleteNote(note) {
        console.log("i'm in deleteNote");
        console.log(note);
        API.deleteNote(note)
                .then(res => {
                    console.log("I've successfully completed deleteNote!")
                    this.renderArticleNotes();
                })
                .catch(err => console.log(err));
        
    }
    deleteArticle(article) {
        console.log("i'm successfully in delete Article!");
        console.log(article);
        API.deleteArticle(article)
            .then(res => {
                console.log("I've successfully completed deleteArticle!")
                this.deletePanel(article);
            })
            .catch(err => console.log(err));
    }

    deletePanel(article) {
        const newState = this.state.savedArticles;
        if (newState.indexOf(article) > -1) {
                newState.splice(newState.indexOf(article), 1);
                this.setState({ savedArticles: newState })
            }
        
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Jumbotron />
                </Row>
                <Modal
                    isOpen={this.state.isModalOpen}
/*                     className="modal-articleNotes" */
                    // style={this.state.style.content}
                >
                    <div className='container-fluid text-center'>
          <h4>Notes For Article: </h4>
          <hr />
          <ul className='list-group note-container'>
          </ul>
        <div>
        <textarea placeholder='New Note' rows='4' cols='60' 
        value={this.state.articleNote}              
        onChange={this.handleInputChange}
        name="articleNote">
        </textarea>
        </div>
         <button className='btn btn-success save' onClick={() => this.addArticleNote()}>Save Note</button>
        <button className='btn btn-danger note-delete noteModal' onClick={() => this.closeModal()}>X</button>
        
          </div>


                    {this.state.currentArticleNotes ? (
                        <NoteContainer>
                            <div>
                                {this.state.currentArticleNotes.map(note => {
                                    let boundNoteClick = this.deleteNote.bind(this, note);
                                    return (
                                        <NotePanel noteText={note.noteText}>
                                            <div>
                                                

                                                {/* <button className='btn btn-danger note-delete' onClick={boundNoteClick}> X </button> */}
                                                

                                                <button className='btn btn-danger note-delete insideNote' onClick={boundNoteClick}> X </button> 
                                            </div>

                                        </NotePanel>
                                    );
                                })}
                            </div>
                        </NoteContainer>
                    ) : (
                            <h3> There are no saved notes! </h3>
                        )}
                </Modal>

                <Row>
                    <Col size="md-12">



                        {this.state.savedArticles.length ? (
                            <ArticlesContainer>
                                <div>
                                    {this.state.savedArticles.map(article => {

                                        {if (article._id) {
                                        let boundItemClick = this.openModal.bind(this, article);
                                        let boundDeleteClick = this.deleteArticle.bind(this, article);
                                        return (
                                            
                                            <ArticlePanel key={article.id} title={article.title} link={article.link} summary={article.summary}>
                                                <div>
                                                <ArticleNotes onClick={boundItemClick}>
                                                
                                                </ArticleNotes>

                                                <DeleteBtn onClick={boundDeleteClick} />

                                                </div>

                                            </ArticlePanel>
                                        );




                                        }
                                        }
                                    
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