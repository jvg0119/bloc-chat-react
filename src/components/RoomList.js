import React, { Component } from 'react';

class RoomList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rooms: []
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

  componentWillMount = () => {
    this.roomsRef = this.props.firebase.database().ref('roomse');
    console.log('from willMount this.roomsRef >>> ', this.roomsRef)
  }


  render() {
    const roomList = this.state.rooms.map((room) =>
      <li key={room.key}>{room.name}</li>)

    return (

      <div>

        {roomList}

      </div>

    )
  }
}

export default RoomList;
