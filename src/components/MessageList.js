import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class MessageList extends Component {

  constructor(props) {
    super(props);
    this.messagesRef = this.props.firebase.database().ref('messages');
    console.log('this.messagesRef >>>', this.messagesRef)

    this.state = {
      username: "<USERNAME HERE>",
      messages: ['This is my first sample message', 'This is my second sample message'],
      content: '', // new message
      sentAt: "<TIME MESSAGE WAS SENT HERE>",
      roomId: "<ROOM UID HERE>"
    }

    //console.log("from constructor >>>>", this.state.username)

  } // end of constructor

  componentDidMount() {
    // this.messagesRef = this.props.firebase.database().ref('messages');
    console.log('componentDidMount >>> +_+_+_+_+_+_', this.messagesRef)
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      console.log('from MessageList >>>> ', message);
      //this.setState({ messages: this.state.messages.concat( message ), content: '', show: false }) // concat adds to the rooms; adding from firebase db
      this.setState({ messages: this.state.messages.concat( message ) })

      console.log('this.state.messages from componentDidMount >>>> ', this.state.messages);
      console.log('message from componentDidMount >>>> ', message);
      console.log('message.roomId from componentDidMount >>>> ', message.username);
      console.log('message.content from componentDidMount >>>> ', message.content);
      console.log('message.sentAt from componentDidMount >>>> ', message.sentAt);
      console.log('message.roomId from componentDidMount >>>> ', message.roomId);
      console.log('message.key from componentDidMount >>>> ', message.key);

    });
  }

  testFunc() {
    console.log('this is testFunc !!!', this.messagesRef.val)
  }


  render () {
    {/* <div>{message}</div> */}

    // const testList = this.state.messages.map((message) => {
    //   <ListGroupItem href="#" >
    //     <h4>{this.state.username}</h4>
    //     <h5>{message}</h5>
    //     <h6>{this.state.sentAt}</h6>
    //   </ListGroupItem>
    //   })


    // const messageList = this.state.messages.map((message) =>
    //   { if (this.state.roomId) {
    //     <ListGroupItem href="#" >
    //       {message}
    //     </ListGroupItem>
    //     {message}
    //     }
    //   })

    const messageList = this.state.messages.map((message) =>

      <ListGroupItem href="#" >
    //    <h5><strong>{message.username}</strong></h5>
    //    <h5>{message}</h5>
    //    <h6>{this.state.sentAt}</h6>
      </ListGroupItem>

      );
    // const messageList = this.state.messages.map((message) => {
    //   <ListGroupItem href="#" >
    //     {message}
    //   </ListGroupItem>
    //
    // })

    //)

    return (
      <div>

        <ListGroup>

          <ListGroupItem href="#" active>
            <h4>Message List Component!!!</h4>
          </ListGroupItem>

          <h4>{messageList}</h4>

          {/* <h4>{testList}</h4> */}

        </ListGroup>

        <button onClick={() => {this.testFunc()}}>test button</button>
        {this.state.messages}

      </div>
    )
  }

}

export default MessageList;
