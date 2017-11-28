import React, { Component } from "react";
import Modal from 'react-modal';
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import ArticleNotes from "../../components/ArticleNotes";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import Footer from "../../components/Footer";
import {ArticlesContainer, ArticlePanel} from "../../components/ArticlesContainer";
import { NoteContainer, NotePanel } from "../../components/NoteContainer";

const modalCustomStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        zIndex: 1000000000000
    },
    content: {
        //Sample Styles
        // height: '800px',
        // width: '800px',
        // position: 'fixed',
        // top: '50%',
        // left: '50%',
        // right: 'auto',
        // bottom: 'auto',
        // marginRight: '-50%',
        // transform: 'translate(-50%, -50%)',
        // zIndex: '1000',
        // overflow: 'auto',
        // backgroundColor: '#eb6864'
    }
};

class savedArticles extends Component {
    state = {
        savedArticles: [],
        isModalOpen: false,
        articleNote: "",
        currentArticle: null,
        currentArticleNotes: []
    };
    componentDidMount() {
        this.loadSavedArticles();
        Modal.setAppElement('body');
    }

    openModal(article, e) {
        this.setState({isModalOpen: true, currentArticle: article, articleNote: ""});
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
                this.setState({ savedArticles: data.data })

            }
                

            )
            .catch(err => console.log(err));
    }


    addArticleNote() {
        let currentArticle = this.state.currentArticle;
        currentArticle.noteText = this.state.articleNote;
        if (this.state.articleNote) {
            API.saveNote(currentArticle)
                .then(res => this.renderArticleNotes(this.state.currentArticle))
                .catch(err => console.log(err));
        }

    };
    renderArticleNotes(article) {
        API.getNotes(article)
            .then(res => {
                this.setState({
                    currentArticleNotes: res.data.notes
                })
            })
            .catch(err => console.log(err));
    }

    deleteNote(note) {
        API.deleteNote(note)
                .then(res => {
                    this.renderArticleNotes(this.state.currentArticle);
                })
                .catch(err => console.log(err));
        
    }
    deleteArticle(article) {
        API.deleteArticle(article)
            .then(res => {
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
                    style = {modalCustomStyles}
                    isOpen={this.state.isModalOpen}
                >
                    <div className='container-fluid text-center'>
          <h1 className="notesHeader">Notes </h1>
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


                    {this.state.currentArticleNotes.length ? (
                        <NoteContainer>
                            <div className="articleNoteContainer">
                                {this.state.currentArticleNotes.map(note => {
                                    let boundNoteClick = this.deleteNote.bind(this, note);
                                    return (
                                        <NotePanel key={note._id} noteText={note.noteText}>
                                            <div>
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

                                        if (article._id) {
                                        let boundItemClick = this.openModal.bind(this, article);
                                        let boundDeleteClick = this.deleteArticle.bind(this, article);
                                        return (
                                            
                                            <ArticlePanel key={article._id} title={article.title} link={article.link} summary={article.summary}>
                                                <div>
                                                <ArticleNotes onClick={boundItemClick}>
                                                
                                                </ArticleNotes>

                                                <DeleteBtn onClick={boundDeleteClick} />

                                                </div>

                                            </ArticlePanel>
                                        );




                                        } else{
                                            return null;
                                        }
                                        
                                    
                                    })}

                                
                                </div>
                            </ArticlesContainer>
                        ) : (
                                <h3> There are no saved articles! </h3>
                            )}

                    </Col>
                </Row>
             
                        <Footer />
          

            </Container>
        );
    
    }




}


export default savedArticles;