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
      // console.log('message.roomId >', message.roomId.toString())
      // console.log('nextProps.activeRoom >', nextProps.activeRoom)
      // console.log('new check ______>>>> ', message)
      if (message.roomId.toString() === nextProps.activeRoom.toString()) {
        // console.log('inside filter >>>', message)
        // this.setState({roomListMessages: this.state.roomListMessages( message )})
        // this.setState({roomListMessages: this.state.roomListMessages.push( message )})
        newMessageList.push(message);
      }
      return newMessageList;
    })
    console.log('newMessageList >>>', newMessageList)
    this.setState({roomListMessages: [...newMessageList]})
  }

  componentDidMount() {
    // this.messagesRef = this.props.firebase.database().ref('messages');
    console.log('componentDidMount >>> ', this.messagesRef)
    const myMessages = this.state.messages
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      console.log('messages >>>>>>>> ', message)

      myMessages.push(message)

      console.log(this.state.messages)
      console.log(myMessages)
      console.log(this.state.messages === myMessages)

      this.setState({messages: myMessages})
      console.log('this.state.messages  >>>>', this.state.messages)
      // this.setState({ messages: this.state.messages.concat( message ), content: ' ' }) // content:''  removes after sent
      //this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

// original - this works
// but does not remove them content and needs refreshing to update messages
  // submitHandler = (e) => {
  //   console.log('submitHandler !!!');
  //   e.preventDefault();
  //
  //   if (this.props.activeRoom) {
  //     console.log('You are now in room ======== ' ,this.props.activeRoom )
  //     if (this.props.user) {
  //       if (this.state.content !== ' ') {
  //         console.log('after this.state.content ******* >>>> ', this.state.content)
  //         this.messagesRef.push({
  //           content: this.state.content,
  //           roomId: this.props.activeRoom,
  //           username: this.props.user.displayName,
  //           sentAt: this.props.firebase.database.ServerValue.TIMESTAMP});
  //
  //       } else {
  //         alert('* Please enter a message')
  //         // this.messagesRef.push({content: this.state.content, roomId: this.props.activeRoom, username: 'Guest'});
  //         // console.log('this is the content >>>> ', this.messagesRef)
  //       }
  //
  //     } else {
  //       alert('* You need to be signed in to send a message!')
  //       //console.log('* Please enter a message!!!')
  //       //console.log('this is the content >>>> ****', this.messagesRef.content)
  //     }
  //   } else {
  //     alert('* Please select a room to send the message first!')
  //     //console.log('* Please select a room to send the message first!')
  //   }
  // }

  validMessageContent(str) {
    const msgContent = str
    console.log('message is ', str)
    if (str.trim().length > 0) {
      console.log("something is here", str.trim().length)
      return true
    } else {
      console.log('nothing is here')
      return false
    }
  }


  submitHandler = (e) => {
    console.log('submitHandler !!!');
    e.preventDefault();
    if (this.validMessageContent(this.state.content)) {

      //removing this for testing purpose
      this.messagesRef.push({
        content: this.state.content,
        roomId: this.props.activeRoom,
        username: this.props.user.displayName,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP});
      console.log('writing to firebase')

    }
    this.setState({ content: "", roomId: "",  username: "", sentAt: ""});
    // this.setState({ content: "", roomId: "",  username: "", sentAt: ""});
    console.log('after writing to firebase >>>', this.state.content)
  }


  changeHandler = (e) => {
    console.log('changeHandler !!!');
    this.setState({ content: e.target.value});
    // console.log('this.setState content >>>> ', this.state.content)
  }

  render () {

    const messageList = this.state.roomListMessages.map((message) => {
      return (

        <ListGroupItem key={message.key} >
          <div>
            <strong>{message.username}</strong>
            <h4>{message.content}</h4>
            {/* <small className={"move-right"}>{message.sentAt}</small> */}
            <small className={"move-right"}>{new Date(message.sentAt).toString()}</small>
          </div>
        </ListGroupItem>
      )

    })

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

          <input className="message-input" type="text" /*value={this.state.content}*/
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
