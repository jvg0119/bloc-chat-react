
// 2/20/2018 Monday w/ notes ... 

import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class MessageList extends Component {

  constructor(props) {
    super(props);
    this.messagesRef = this.props.firebase.database().ref('messages');

    // this.sessionsRef = this.props.firebase.database().ref("sessions");
    // console.log('this.sessionsRef >>> ==================>>>>>>>>>', this.sessionsRef)

    // var sessionsRef = firebase.database().ref("sessions");
    //   sessionsRef.push({
    //     startedAt: firebase.database.ServerValue.TIMESTAMP
    //   });

    // console.log('this.messagesRef >>>', this.messagesRef) // this.roomListMessages;

    this.state = {
      username: "<USERNAME HERE>",
      messages: [],//['This is my first sample message', 'This is my second sample message'],
      content: '', // new message
      sentAt: "<TIME MESSAGE WAS SENT HERE>",
      roomId: "<ROOM UID HERE>",
      roomListMessages: [],
      // room: ''
    }

  } // end of constructor

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps');
    // console.log('this >>> ',this);
    // console.log('this.state.messages >>> ',this.state.messages)
    // console.log('this.state.messages.length >>> ',this.state.messages.length)
    // console.log('this.state.messages[0] >>> ',this.state.messages[0])

    //const newRoomListMessages = this.state.messages.filter((message) => {
    // console.log('nextProps >>>> ', nextProps);
    const newMessageList = [];
    // let roomState;
    this.state.messages.filter((message) => {
      // console.log('message.username  ********** >>> ', message.username);
      // console.log('message.roomId  ********** >>> ', message.roomId);
      // console.log('message.sentAt  ********** >>> ', message.sentAt);
      // console.log('message.key ********** >>> ' , message.key);
      // console.log('this.props.activeRoom ))))>>> ', this.props.activeRoom);
      // if (message.roomId == this.props.activeRoom) {
      if (message.roomId == nextProps.activeRoom) {
        // console.log('inside filter >>>', message)
        // this.setState({roomListMessages: this.state.roomListMessages( message )})
        // this.setState({roomListMessages: this.state.roomListMessages.push( message )})
        newMessageList.push(message);
        // roomState = message.roomId;
      }
    })
    console.log('newMessageList >>> ', newMessageList)
    this.setState({roomListMessages: [...newMessageList]})
//    this.setState({room: roomState})

    //console.log(roomListMessages)

    // console.log('roomListMessages *>> ', this.state.roomListMessages)
    // console.log('this.sessionsRef >>> ==================>>>>>>>>>', this.sessionsRef)
    // console.log('this.sessionsRef >>> ==================>>>>>>>>>', this.sessionsRef.ServerValue.TIMESTAMP)

  }

  componentDidMount() {
    // this.messagesRef = this.props.firebase.database().ref('messages');
    console.log('componentDidMount >>> ', this.messagesRef)
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      //message.sentAt = snapshot.ServerValue.TIMESTAMP

      // firebase.database.ServerValue.TIMESTAMP
      // console.log('from MessageList >>>> ', message);
      // this.setState({ messages: this.state.messages.concat( message ), content: '', show: false }) // concat adds to the rooms; adding from firebase d

      this.setState({ messages: this.state.messages.concat( message ) })

      // console.log('this.state.messages.concate(message) >>> $%',  this.state.messages.concat( message ) )

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
        <ListGroupItem href="#" >
          <div>
            <strong>{message.username}</strong>
            <h4>{message.content}</h4>
            <small className={"move-right"}>{message.sentAt}</small>
            {/* <small>room id: {message.roomId}</small><br/> */}
            {/* <small>activeRoom: {this.props.activeRoom}</small><br/> */}
            {/* <small>message.key: {message.key}</small> */}
          </div>
        </ListGroupItem>
      )

    })

    // not using this; delete later
    // const activeRm = this.state.roomListMessages.map((message) => {
    //   return(
    //
    //     <ListGroupItem href="#" active>
    //       <h4>Room  {message.roomId}</h4>
    //     </ListGroupItem>
    //   )
    // })


    return (
      <div>

        <ListGroupItem href="#" active>
          <h4>Room  {this.props.activeRoom}</h4>
        </ListGroupItem>

        <ListGroup>

          {messageList}

        </ListGroup>

      </div>
    )

  } // end of render

} // end of MessageList Component

export default MessageList;
