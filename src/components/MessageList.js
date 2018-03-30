import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import './MessageList.css';

class MessageList extends Component {

  constructor(props) {
    super(props);

    this.messagesRef = this.props.firebase.database().ref('messages');
    this.roomsRef = this.props.firebase.database().ref('rooms')

    this.submitHandler = this.submitHandler.bind(this);

    this.state = {
      username: "<USERNAME HERE>",

      messages: [],//['This is my first sample message', 'This is my second sample message'],
      content: '', // new message
      sentAt: "<TIME MESSAGE WAS SENT HERE>",
      roomId: "<ROOM UID HERE>",
      roomListMessages: []
    }
  }

//////////////////////////////

  validMessageContent(str) {
    console.log('message is ', str)
    if (str.trim().length > 0) {
      console.log("something is here", str.trim().length)
      return true
    } else {
      console.log('nothing is here')
      return false
    }
  }

  submitHandler(e) {  // create or add message
    e.preventDefault();
    // console.log('submitHandler !!!');
    // console.log('submitHandler !!! roomId >>> ', this.props.activeRoom);
    if (this.validMessageContent(this.state.content)) {
      this.messagesRef.push({
        roomId: this.props.activeRoom.key,
        content: this.state.content,
        username: this.props.user.displayName,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP});
        //console.log('writing to firebase')
    }
    this.setState({ content: '', roomId: '',  username: '', sentAt: ''});
  } // submitHandler

  changeHandler = (e) => {
    //console.log('changeHandler !!!', e.target.value);
    this.setState({ content: e.target.value});
  }

  removeMessage(message) {
    this.messagesRef.child(message.key).remove();
  }

  editMessage() {
    console.log('editMessage !!!')
  }

//////////////////////////////

  componentDidMount() {
    //console.log("componentDidMount triggered !!!");
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({
        messages: this.state.messages.concat( message ),
        content: ''
      }
      , () => {
        this.updateDisplayedMessages(this.props.activeRoom)
      });
    }); //  this.messagesRef.on('child_added'

    this.messagesRef.on('child_removed', snapshot => {
      this.setState((prevState) => ({
        messages: prevState.messages.filter((message) => {
          console.log('from this.setState(()) the message!!!', message)
          return (
            message.key !== snapshot.key
          )
        })  // messages: prevState.messages.filter((message) => {
      })
      ,() => {
        this.updateDisplayedMessages(this.props.activeRoom)
      })
    }) // this.roomsRef.on('child_removed', snapshot
  } // componentDidMount() {

  componentWillReceiveProps(nextProps) {
    this.updateDisplayedMessages(nextProps.activeRoom);
  }

  updateDisplayedMessages(activeRoom) {
    console.log(activeRoom)
    if(activeRoom && activeRoom.key) {
      const newMessageList = this.state.messages.filter((message) => {
        return message.roomId.toString() === activeRoom.key.toString();
      });
      this.setState({roomListMessages: newMessageList});
    }
  }

  componentDidUpdate() {
    const roomsRef = this.props.firebase.database().ref('rooms');
    roomsRef.on('child_removed', snapshot => {
      const removedRoom = snapshot
      this.state.messages.map((message) => {

        return (
          message.roomId !== removedRoom.key
          ? message
          : this.removeMessage(message)
        )

      })
    })
  }

/////////////////////////////////

  render () {

    const removeMessageStyle = {
      fontSize: ".8em",
      color: "white",
      background: "darkRed",
      border: "2px solid black",
      borderRadius: "20px"
    }

    const EditMessageStyle = {
      fontSize: ".8em",
      color: "white",
      background: "#255D99",
      border: "2px solid black",
      borderRadius: "20px"
    }

    const messageList = this.state.roomListMessages.map((message) => {
        return (
          <ListGroupItem key={message.key} >
            <div>
              <strong>{message.username}</strong>
              <h4>{message.content}</h4>
              <small className={"move-right"}>{new Date(message.sentAt).toString()}</small>

              { (this.props.user) && (this.props.user.displayName === message.username)  &&
              <button style={EditMessageStyle} onClick={() => this.editMessage(message)}>Edit message</button> } &nbsp;

              { (this.props.user) && (this.props.user.displayName === message.username)  &&
              <button style={removeMessageStyle} onClick={() => this.removeMessage(message)}>delete</button> }

            </div>
          </ListGroupItem>
        )
    })

    return (

      <div>

        <ListGroupItem active>
          <h3>{this.props.activeRoom.name}</h3>
        </ListGroupItem>

        <ListGroup>
          {
            this.props.activeRoom !== '' && messageList.length > 0
            ? messageList
            : this.props.activeRoom !== ''
            ? <h4>No message for this room</h4>
            : this.props.messageStatus

          }
        </ListGroup>

        { this.props.user && this.props.activeRoom !== '' &&
        <form className="message-form" onSubmit={ (e) => this.submitHandler(e) }>

          <input className="message-input" type="text"
            value={this.state.content} // used to remove content from input
            onChange={(e) => this.changeHandler(e)}
            placeholder={'Enter your new message'}
          />

          <input type="submit" value="Send"/>

        </form>

        }
      </div>
    )

  } // end of render

} // end of MessageList Component

export default MessageList;
