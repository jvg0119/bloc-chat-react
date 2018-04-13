import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';


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
//    this.setActiveRoom = this.setActiveRoom.bind(this)

    this.state = {
      activeRoom: '',
      user: null,
      userEmail: null,
      currentRoomName: 'No room selected',
      messageStatus: '',
      activeEditMessage: ''
    }
  }

  setActiveRoom = (room) => {
    //console.log('from activeRoom function room arg is >>> ' + room)
    this.setState({activeRoom: room})
    console.log('room in setActiveRoom >>> ', room)
    console.log('activeRoom after setting >>> '+ this.state.activeRoom)
  }

  setUser = (user) => {
    this.setState({user: user});
  }

  setActiveEditMessage = (message) => {
    this.setState((prevState) => ({
      activeEditMessage: message
    }))
  // this.setState({activeEditMessage: message})
  }

  render() {

    return (

      <div>

        <div className="container">

          <div className="left-column">

            <h2>Bloc Chat</h2>

            <RoomList firebase={firebase}
              setActiveRoom={this.setActiveRoom}
              activeRoom={this.state.activeRoom}
              currentRoomName={this.state.currentRoomName}
              user={this.state.user}
            />

            <User firebase={firebase} setUser={this.setUser} user={this.state.user}/>

          </div>

          <div className="right-column">

            <MessageList firebase={firebase}
              activeRoom={this.state.activeRoom}
              user={this.state.user}
              messageStatus={this.state.messageStatus}
              activeEditMessage={this.state.activeEditMessage}
              setActiveEditMessage={this.setActiveEditMessage}
            />

          </div>

        </div>

      </div>

    )

  } // eo render
} // eo App Component

export default App;
