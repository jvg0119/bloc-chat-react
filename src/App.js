import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

<<<<<<< HEAD
=======
//import { Modal } from 'react-bootstrap';

>>>>>>> 5-send-messages
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

  constructor(props) {
    super(props);

    this.state = {
      activeRoom: '',
      user: null
    }
  }

  activeRoom = (room) => {
    console.log('from activeRoom function room arg is >>> ' + room)
    this.setState({activeRoom: room})
    console.log('activeRoom after setting >>> ', this.state.activeRoom)
  }

  setUser = (user) => {
    //console.log('setUser method');
    this.setState({user: user});
  }

  render() {

    return (

      <div className="container">

<<<<<<< HEAD
        <div className="left-column">
          <h2>Bloc Chat</h2>
            <RoomList firebase={firebase} activeRoom={this.activeRoom} />
            <User firebase={firebase} setUser={this.setUser} user={this.state.user} />
        </div>
=======
          </div>

          <div className="right-column">
            <MessageList firebase={firebase} activeRoom={this.state.activeRoom} user={this.state.user}/>
          </div>
>>>>>>> 5-send-messages

        <div className="right-column">
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
        </div>

      </div>

    );
  }
}

export default App;
