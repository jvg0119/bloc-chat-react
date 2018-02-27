import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

class RoomList extends Component {

  constructor(props) {
    super(props);
    this.roomsRef = this.props.firebase.database().ref('rooms');
    // console.log('this.roomsRef from RoomList >>> ', this.roomsRef)
    this.state = {
      rooms: [],
      newRoomName: ''

    }
  }

  componentDidMount() {
    // this.roomsRef = this.props.firebase.database().ref('rooms');
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      console.log('from RoomList >>>> ', room);
      this.setState({ rooms: this.state.rooms.concat( room ), newRoomName: '', show: false }) // concat adds to the rooms; adding from firebase db
    });
  }

  changeHandler(e) {
  //  changeHandler = (e) => {
  //  console.log('changeHandler !!!');
    this.setState({ newRoomName: e.target.value});
  //  console.log('newRoomName >>> ', this.state.newRoomName)
  }

  submitHandler(e) {
    // console.log('submitHandler !!!');
    e.preventDefault();
    this.state.newRoomName ?
      this.roomsRef.push({
        name: this.state.newRoomName
      }) :
      alert('* Please enter a new room name');
  }

  /* hide modal */
  handleHide = () => {
    this.setState({ show: false , newRoomName: ''});
    // console.log('show >>>', this.state.show)
  }

  selectedRoom = (e, room) => {
    //console.log('selectedRoom key is ', room)
    e.preventDefault();
    this.props.activeRoom(room)
  }

  render() {

    const roomList = this.state.rooms.map((room, index) =>
      /* <div className="room-list" href="#" key={index} onClick={() => this.selectedRoom(room.key)}>{room.name}</div> */
      <div className="room-list" href="#" key={index} onClick={(e) => this.selectedRoom(e, room.key)}>
        <a href="*">{room.name}</a>
      </div>

    )

    return (

      <div>

        <div className="modal-container" style={{ height: 10 }}>
          <Modal
            show={this.state.show}
            onHide={this.handleHide}
            container={this}
            aria-labelledby="contained-modal-title">

            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">
                Create new room
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              Enter a new room name &nbsp;
              <input type="text" onChange={(e) => this.changeHandler(e)} value={this.state.newRoomName} style={{width: 400, height: 40}} /> &nbsp;
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.handleHide}>Cancel</Button>
              <Button bsStyle="primary" bsSize="small" onClick={(e) => this.submitHandler(e)}>Submit</Button>
            </Modal.Footer>

          </Modal>
        </div>

        <Button
          className="move-right"
          bsStyle="primary"
          bsSize="small"
          onClick={() => this.setState({ show: true })}>
          New room
        </Button>

        <h4>{roomList}</h4>

      </div>

    )
  }
}

export default RoomList;
