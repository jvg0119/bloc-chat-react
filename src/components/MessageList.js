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
      // sentAt: "<TIME MESSAGE WAS SENT HERE>",
      // roomId: "<ROOM UID HERE>",
      roomListMessages: [],

      selectedEditMessage: '',
      messageContent: '',
      showEdit: true

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
    // console.log('submitHandler !!! roomId >>> ', this.props.activeRoom);
    if (this.validMessageContent(this.state.content)) {
      this.messagesRef.push({
        roomId: this.props.activeRoom.key,
        content: this.state.content,
        username: this.props.user.displayName,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP});
        //console.log('writing to firebase')
        this.setState(() => ({ content: '' }))
        console.log('submit handler content >>> ', this.state.content)
    }
  } // submitHandler

  changeHandler = (e) => {
    this.setState({ content: e.target.value});
  }

  removeMessage(message) {
    this.messagesRef.child(message.key).remove();
  }

  editMessageChangeHandler(e) {
    this.setState({messageContent: e.target.value});
  }

  editChangeHandler(e) {      // not used  remove later
    this.setState({messageContent: this.state.content})
    console.log('this.state.content >>>', this.state.content)
  }

  editMessageHandler(message) {
    this.setState({selectedEditMessage: message.content});
    this.setState({messageContent: message.content})
  }

  messageChangeHandler = (e) => {
    //console.log('changeHandler !!!', e.target.value);
    this.setState({ content: e.target.value});
  }

  updateMessageHandler(e, message) {
    const replaceContent  = this.props.firebase.database().ref(`messages/${message.key}`);
    //console.log('>>>>>> ', `messages/${message.key}`)
    replaceContent.update({content: this.state.messageContent})
  }

//////////////////////////////

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({
        messages: this.state.messages.concat( message ),
      }
      , () => {
        this.updateDisplayedMessages(this.props.activeRoom)
      });
      console.log('child_added content after >>> ', this.state.content)
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

  this.messagesRef.on('child_changed', snapshot => {
    const changed_message = snapshot.val();
    changed_message.key = snapshot.key;
  let index ;
  let newMessages = this.state.messages.map((message, i) => {
    if (message.key === changed_message.key) {
      index = i
    }
    return message
  })

  // console.log('index >> ', index);
  // console.log('newMessages >> ', newMessages)
  // console.log('changed_message >> ', changed_message)

  newMessages.splice(index,1,changed_message)

  console.log('mewMessages >>> ', newMessages)
  this.setState({messages: newMessages}
    ,() => {
      this.updateDisplayedMessages(this.props.activeRoom)
    });

  // This works except the order get changed after you update
  // the one you update becomes the last element and will move to the end
  // const unchanged_messages = this.state.messages.filter((message) => message.key !== changed_message.key);
      /*
          this.setState({
            messages: unchanged_messages.concat( changed_message ),
          }
          , () => {
            this.updateDisplayedMessages(this.props.activeRoom)
          });
      */

    });
  } // componentDidMount() {

  componentWillReceiveProps(nextProps) {
    this.updateDisplayedMessages(nextProps.activeRoom);
  }

  updateDisplayedMessages(activeRoom) {
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
    }) // end of    roomsRef.on('child_removed', snapshot => {
  } // end of     componentDidUpdate() {

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

              {
                message.content !== this.state.selectedEditMessage
                ?
                  <button
                    style={EditMessageStyle}
                    onClick={() => this.editMessageHandler(message)}
                  >
                    edit message
                  </button>
                :
                (
                  <div>
                    <input
                      style={{"height" : "100%"}, {"width" : "70%"}}
                      value={this.state.messageContent}
                      onChange={(e) => this.editMessageChangeHandler(e)}
                    />
                    <button
                      style={EditMessageStyle}
                      onClick={(e) => this.updateMessageHandler(e, message)}
                    >
                      update message</button>
                  </div>
                )
              }

              { (this.props.user) && (this.props.user.displayName === message.username)  &&
              <button
                style={removeMessageStyle}
                onClick={() => this.removeMessage(message)}
                hidden={!this.state.showEdit}
                >
                  delete
                </button> }
            </div>
          </ListGroupItem>
        )
    })

    return (

      <div>

        <ListGroupItem active>

          {
            <h3>{this.props.activeRoom.name}</h3>
          }
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
            value={this.state.content}
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
