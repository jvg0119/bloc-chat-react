import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import './MessageList.css';

class MessageList extends Component {

  constructor(props) {
    super(props);
    this.messagesRef = this.props.firebase.database().ref('messages');
    console.log('messages from constructor >>>>> ', this.messagesRef)

    this.state = {
      username: "<USERNAME HERE>",
      messages: [],//['This is my first sample message', 'This is my second sample message'],
      content: '', // new message
      sentAt: "<TIME MESSAGE WAS SENT HERE>",
      roomId: "<ROOM UID HERE>",
      roomListMessages: [],
      roomName: ''
    }
    this.submitHandler = this.submitHandler.bind(this);
  } // end of constructor

  componentDidMount() {
    const myMessages = this.state.messages
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({
        messages: this.state.messages.concat( message ),
        content: ''
      }, () => {
        this.updateDisplayedMessages(this.props.activeRoom)
      });
    })
  }

//  this worked but did not automatically show the sent message
  componentWillReceiveProps(nextProps) {
    this.updateDisplayedMessages(nextProps.activeRoom);
  }

  updateDisplayedMessages(activeRoom) {
    const newMessageList = this.state.messages.filter((message) => {
      return message.roomId.toString() === activeRoom.toString();
    });
    this.setState({roomListMessages: newMessageList});
  }


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

  submitHandler(e) {
    console.log('submitHandler !!!');
    e.preventDefault();
    if (this.validMessageContent(this.state.content)) {

      this.messagesRef.push({
        content: this.state.content,
        roomId: this.props.activeRoom,
        username: this.props.user.displayName,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP});
      //console.log('writing to firebase')
    }
    this.setState({ content: '', roomId: '',  username: '', sentAt: ''});

    console.log('after writing to firebase >>>', this.state.content)
  }

  changeHandler = (e) => {
    console.log('changeHandler !!!');
    this.setState({ content: e.target.value});
  }

  render () {

    const messageList = this.state.roomListMessages.map((message) => {
      if (this.props.activeRoom === message.roomId) {
        return (
          <ListGroupItem key={message.key} >
            <div>
              <strong>{message.username}</strong>
              <h4>{message.content}</h4>
              <small className={"move-right"}>{new Date(message.sentAt).toString()}</small>
            </div>
          </ListGroupItem>
        )
      }

    })

    // const messageList = this.state.messages.map((message) => {
    //   return(
    //     <ListGroupItem key={message.key} >
    //       <strong>{message.username}</strong>
    //       <h4>{message.content}</h4>
    //       <small className={"move-right"}>{new Date(message.sentAt).toString()}</small>
    //     </ListGroupItem>
    //   )
    // })

    // const messageList = this.state.messages.map((message) => {
    //    if (this.props.activeRoom === message.roomId) {
    //     return (
    //       <ListGroupItem key={message.key} >
    //         <div>
    //           <strong>{message.username}</strong>
    //           <h4>{message.content}</h4>
    //           <small className={"move-right"}>{new Date(message.sentAt).toString()}</small>
    //         </div>
    //       </ListGroupItem>
    //     )
    //   }
    // })

    return (

      <div>

        <ListGroupItem active>
          <h4>{this.props.currentRoomName ? ' ' + this.props.currentRoomName : ' No Room Selected' }</h4>
        </ListGroupItem>

        <ListGroup>
          {messageList}
        </ListGroup>

        {/* <form className="message-form" onSubmit={ (e) => this.submitHandler(e) }> */}

        { this.props.user &&
        <form className="message-form" onSubmit={ (e) => this.submitHandler(e) }>

          <input className="message-input" type="text" value={this.state.content} // used to remove content from input
          onChange={(e) => this.changeHandler(e)}
          placeholder={'Enter your message'}
          />&nbsp;
          <input type="submit" value="Send"
          />

        </form>

        }
      </div>
    )

  } // end of render

} // end of MessageList Component

export default MessageList;
