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
      // console.log('snapshot >>>>', snapshot);
      const room = snapshot.val();
      // console.log('room >>>', room)
      room.key = snapshot.key;
      // console.log('room.key >>> ', room.key)
      // console.log('room after >>> ', room)
      // this.setState({ rooms: this.state.rooms.concat( snapshot.val() ) });
      // console.log('snapshot >>>', snapshot);
      // console.log('this.state.rooms >>> ', this.state.rooms.length)
      // console.log('this.state.rooms.concat( room ) >>> ',  this.state.rooms.concat( room ).length);
      // console.log('rooms >>>', this.state.rooms) // empty or whatever is defaulted
      this.setState({ rooms: this.state.rooms.concat( room ) }) // concat adds to the rooms; adding from firebase db
    });
  }

  componentWillMount = () => {
    this.roomsRef = this.props.firebase.database().ref('roomse');
    console.log('from willMount this.roomsRef >>> ', this.roomsRef)
  }


  render() {
    const roomList = this.state.rooms.map((room) =>
      //<li >{room.name} - {room.key} {console.log(room.key, ' - ' ,key)}</li>);
      <li key={room.key}>{room.name}</li>)

    return (

      <div>

        {roomList}

      </div>

    )
  }
}

export default RoomList;
