import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class MessageList extends Component {

  constructor(props) {
    super(props);
    this.messagesRef = this.props.firebase.database().ref('messages');

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
    // console.log('componentWillReceiveProps');
    // console.log('this >>> ',this);

    //const newRoomListMessages = this.state.messages.filter((message) => {
    // console.log('nextProps >>>> ', nextProps);
    const newMessageList = [];
    this.state.messages.filter((message) => {
      // console.log('message.username  ********** >>> ', message.username);
      // console.log('message.roomId  ********** >>> ', message.roomId);
      // console.log('message.sentAt  ********** >>> ', message.sentAt);
      // console.log('message.key ********** >>> ' , message.key);
      // console.log('this.props.activeRoom ))))>>> ', this.props.activeRoom);
      // if (message.roomId == this.props.activeRoom) {
      if (message.roomId.toString() === nextProps.activeRoom) {
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
    // console.log('newMessageList >>> ', newMessageList)
    this.setState({roomListMessages: [...newMessageList]})
    //  this.setState({room: roomState})

    //console.log(roomListMessages)
  }

  componentDidMount() {
    // this.messagesRef = this.props.firebase.database().ref('messages');
    console.log('componentDidMount >>> ', this.messagesRef)
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;

      // firebase.database.ServerValue.TIMESTAMP
      // console.log('from MessageList >>>> ', message);
      // this.setState({ messages: this.state.messages.concat( message ), content: '', show: false }) // concat adds to the rooms; adding from firebase d

      this.setState({ messages: this.state.messages.concat( message ) })

      // console.log('this.state.messages.concat(message) >>> $%',  this.state.messages.concat( message ) )

      // console.log('this.state.messages from componentDidMount >>>> ', this.state.messages);
      // console.log('message from componentDidMount >>>> ', message);
      // console.log('message.roomId from componentDidMount >>>> ', message.username);
      // console.log('message.content from componentDidMount >>>> ', message.content);
      // console.log('message.sentAt from componentDidMount >>>> ', message.sentAt);
      // console.log('message.roomId from componentDidMount >>>> ', message.roomId);
      // console.log('message.key from componentDidMount >>>> ', message.key);

      // console.log('activeRoom console.log >>> ', this.activeRoom)

    });
  }

  render () {

  const messageList = this.state.roomListMessages.map((message) => {
    return (
      <ListGroupItem href="#" key={message.key} >
         <div>
           <strong>{message.username}</strong>
            <h4>{message.content}</h4>
            <small className={"move-right"}>{message.sentAt}</small>
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

      </div>
    )

  } // end of render

} // end of MessageList Component

export default MessageList;
