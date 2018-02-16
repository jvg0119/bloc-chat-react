import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
//import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
//import { Container, Row, Col } from 'reactstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';


  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyCxwTxIFjbi4xm9gcnvEPA4yijul98UEo0",
    authDomain: "bloc-chat-5ea08.firebaseapp.com",
    databaseURL: "https://bloc-chat-5ea08.firebaseio.com",
    projectId: "bloc-chat-5ea08",
    storageBucket: "bloc-chat-5ea08.appspot.com",
    messagingSenderId: "170107807382"
  };
  firebase.initializeApp(config);

class App extends Component {

/*
  constructor(props, context) {
    super(props, context);
    this.state = {
      //showModal: false,
      //show: false
    }

  }


  addRoom = () => {
    console.log('addRoom was clicked!!!')

    console.log('showModal before >>> ', this.state.showModal)
    let newState = this.state.showModal
    newState = newState ? false : true
    console.log('newState >>> ', newState)
    this.setState({showModal: newState})
    console.log('showModal  after >>> ', this.state.showModal)

  }

  toggleShow = () => {
    console.log('toggleShow !!!!!!' , this.state.show);
    let newState = this.state.show
    newState = this.state.show ? false : true
    this.setState({show: newState})
    console.log('after >>>', this.state.show)
  }

  handleHide = () => {
    this.setState({ show: false });
    console.log('show >>>', this.state.show)
  }

*/
  render() {

    return (

      <div className="container">

        <div className="left-column">

          <h2>Bloc Chat</h2>
          {/* <Button bsStyle="success" className="move-right" onClick={this.addRoom}>Add Room</Button> */}

          {/*  <Button
            className="move-right"
            bsStyle="primary"
            bsSize="medium"
            onClick={() => this.setState({ show: true })}>

            New room
          </Button>
          */}

          <RoomList firebase={firebase} />

        </div>

        <div className="right-column">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </div>


        <div className="modal-container" style={{ height: 200 }}>

{/*
          <Modal
            show={this.state.show}
            onHide={this.handleHide}
            container={this}
            aria-labelledby="contained-modal-title">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">
                Create new room
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Enter a room name &nbsp;
              <input/>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleHide}>Cancel</Button>
              <Button bsStyle="primary" bsSize="medium" onClick={this.handleHide}>Submit</Button>
            </Modal.Footer>
          </Modal>
*/}
        </div>

      </div>

    );
  }
}

export default App;
