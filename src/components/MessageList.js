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
      roomListMessages: []
    }

  } // end of constructor

  componentWillReceiveProps(nextProps) {
    const newMessageList = [];
    this.state.messages.filter((message) => {
      // console.log('message.username  ********** >>> ', message.username);
      // console.log('message.roomId  ********** >>> ', message.roomId);
      // console.log('message.sentAt  ********** >>> ', message.sentAt);
      // console.log('message.key ********** >>> ' , message.key);
      // console.log('this.props.activeRoom ))))>>> ', this.props.activeRoom);
      // if (message.roomId == this.props.activeRoom) {
<<<<<<< HEAD
      if (message.roomId.toString() === nextProps.activeRoom) {
=======
      // console.log('message.roomId >', message.roomId.toString())
      // console.log('nextProps.activeRoom >', nextProps.activeRoom)
      // console.log('new check ______>>>> ', message)
      if (message.roomId.toString() === nextProps.activeRoom.toString()) {
>>>>>>> 5-send-messages
        // console.log('inside filter >>>', message)
        // this.setState({roomListMessages: this.state.roomListMessages( message )})
        // this.setState({roomListMessages: this.state.roomListMessages.push( message )})
        newMessageList.push(message);
        // console.log('compare ++++++++>>>', message.roomId, nextProps.activeRoom )
        // console.log('nextProps.activeRoom ++++++++>>>', typeof(nextProps.activeRoom) ) // string
        // console.log('message.roomId ++++++++>>>', typeof(message.roomId) ) // number
      }
      return newMessageList;
    })
<<<<<<< HEAD
    // console.log('newMessageList >>> ', newMessageList)
=======
    console.log('newMessageList >>>', newMessageList)
>>>>>>> 5-send-messages
    this.setState({roomListMessages: [...newMessageList]})
  }

  componentDidMount() {
    // this.messagesRef = this.props.firebase.database().ref('messages');
    console.log('componentDidMount >>> ', this.messagesRef)
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;

<<<<<<< HEAD
      // firebase.database.ServerValue.TIMESTAMP
      // console.log('from MessageList >>>> ', message);
      // this.setState({ messages: this.state.messages.concat( message ), content: '', show: false }) // concat adds to the rooms; adding from firebase d

      this.setState({ messages: this.state.messages.concat( message ) })

      // console.log('this.state.messages.concat(message) >>> $%',  this.state.messages.concat( message ) )
=======
      this.setState({ messages: this.state.messages.concat( message ), content: ' ' }) // content:''  removes after sent
    });
  }
>>>>>>> 5-send-messages

  submitHandler = (e) => {
    console.log('submitHandler !!!');
    e.preventDefault();

    if (this.props.activeRoom) {
      console.log('You are now in room ======== ' ,this.props.activeRoom )
      if (this.props.user) {
        if (this.state.content !== ' ') {
          console.log('after this.state.content ******* >>>> ', this.state.content)
          this.messagesRef.push({
            content: this.state.content,
            roomId: this.props.activeRoom,
            username: this.props.user.displayName,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP});

        } else {
          alert('* Please enter a message')
          // this.messagesRef.push({content: this.state.content, roomId: this.props.activeRoom, username: 'Guest'});
          // console.log('this is the content >>>> ', this.messagesRef)
        }

      } else {
        alert('* You need to be signed in to send a message!')
        //console.log('* Please enter a message!!!')
        //console.log('this is the content >>>> ****', this.messagesRef.content)
      }
    } else {
      alert('* Please select a room to send the message first!')
      //console.log('* Please select a room to send the message first!')
    }

  }

  changeHandler = (e) => {
    console.log('changeHandler !!!');
    this.setState({ content: e.target.value});
    // console.log('this.setState content >>>> ', this.state.content)
  }

  render () {

<<<<<<< HEAD
  const messageList = this.state.roomListMessages.map((message) => {
    return (
      <ListGroupItem href="#" key={message.key} >
         <div>
           <strong>{message.username}</strong>
            <h4>{message.content}</h4>
            <small className={"move-right"}>{message.sentAt}</small>
=======
    const messageList = this.state.roomListMessages.map((message) => {
      return (

        <ListGroupItem key={message.key} >
          <div>
            <strong>{message.username}</strong>
            <h4>{message.content}</h4>
            {/* <small className={"move-right"}>{message.sentAt}</small> */}
            <small className={"move-right"}>{new Date(message.sentAt).toString()}</small>
>>>>>>> 5-send-messages
          </div>
        </ListGroupItem>
      )
    })

    return (
      <div>

        <ListGroupItem href="#" active>
          <h4>Room {this.props.activeRoom}</h4>
        </ListGroupItem>

        <ListGroup>
          {messageList}
        </ListGroup>

        <form className="message-form" onSubmit={ (e) => this.submitHandler(e) }>

            <input className="message-input" type="text" value={this.state.content} onChange={(e) => this.changeHandler(e)}/>&nbsp;
            <input type="submit" value="Send"/>

        </form>



      </div>
    )

  } // end of render

} // end of MessageList Component

export default MessageList;
