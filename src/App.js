import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

//import { Modal } from 'react-bootstrap';

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
      user: null,
      currentRoomName: ''
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

//  setCurrentRoomName(room) {
  setCurrentRoomName = (room) => {
    this.setState({currentRoomName: room})
  }

  render() {

    return (

      <div>

        <div className="container">

          <div className="left-column">
            <h2>Bloc Chat</h2>
              <RoomList firebase={firebase} activeRoom={this.activeRoom}
              currentRoomName={this.state.currentRoomName} setCurrentRoomName={this.setCurrentRoomName}
              />

              <User firebase={firebase} setUser={this.setUser} user={this.state.user}/>

          </div>

          <div className="right-column">
            <MessageList firebase={firebase} activeRoom={this.state.activeRoom} user={this.state.user}
            currentRoomName={this.state.currentRoomName}/>
          </div>

        </div>

      </div>

    )

  } // eo render
} // eo App Component

export default App;
