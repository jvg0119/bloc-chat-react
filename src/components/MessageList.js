import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import './MessageList.css';

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
      roomListMessages: [],
      // room: ''
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
      if (message.roomId == nextProps.activeRoom) {
        // console.log('inside filter >>>', message)
        // this.setState({roomListMessages: this.state.roomListMessages( message )})
        // this.setState({roomListMessages: this.state.roomListMessages.push( message )})
        newMessageList.push(message);
      }
    })
    console.log('newMessageList >>> ', newMessageList)
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

  submitHandler = (e) => {
    console.log('submitHandler !!!');
    e.preventDefault();
//    this.state.content
//    ? this.
  }


  // this.state.newRoomName ?
  //   this.roomsRef.push({
  //     name: this.state.newRoomName
  //   }) :
  //   alert('*Please enter a new room name');
  // }



  changeHandler = (e) => {
    console.log('changeHandler !!!');
    this.setState({ content: e.target.value});
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

    return (
      <div>

        <ListGroupItem href="#" active>
          <h4>Room  {this.props.activeRoom}</h4>
        </ListGroupItem>

        <ListGroup>

          {messageList}

        </ListGroup>



        <form className="message-form" onSubmit={ (e) => this.submitHandler(e) }>
          {/* <input type="text" value={this.state.newTodoDescription} onChange={this.handlechange}/> */}
          <input className="message-input" type="text" value={this.state.content} onChange={(e) => this.changeHandler(e)}/>&nbsp;
          {/* <input type="text" value={this.state.newTodoDescription} /> */}
          <input type="submit" />
          {/* <div> new item to be added: { this.state.newTodoDescription }</div> */}
        </form>



      </div>
    )

  } // end of render

} // end of MessageList Component

export default MessageList;
