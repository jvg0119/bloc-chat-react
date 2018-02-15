import React, { Component } from 'react';

class RoomList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ''
    }
  }

  componentDidMount() {
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) }) // concat adds to the rooms; adding from firebase db
    });
  }

  changeHandler(e) {
//  changeHandler = (e) => {
    console.log('changeHandler !!!');
    this.setState({ newRoomName: e.target.value });
    console.log('newRoomName >>> ', this.state.newRoomName)
  }

  submitHandler(e) {
    console.log('submitHandler !!!');
    e.preventDefault();
    //this.state.newRoomName ? console.log('good') : alert('there is no newRoomName!')

    this.state.newRoomName ?
      this.roomsRef.push({
        name: this.state.newRoomName
      }) :
      alert('Please add a new room name!');
  }

  render() {
    const roomList = this.state.rooms.map((room) =>
      <h5 key={room.key}>{room.name}</h5>)

    return (

      <div>

        {roomList}

        <br />

        <form onSubmit={(e) => this.submitHandler(e)}>
          <input type="text" onChange={(e) => this.changeHandler(e)} value={this.state.newRoomName} /> &nbsp;
          <input type="submit" />
          <br />
          {this.state.newRoomName}
        </form>

      </div>

    )
  }
}

export default RoomList;
