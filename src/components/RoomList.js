import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class RoomList extends Component {

  constructor(props) {
    super(props);

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.messagesRef = this.props.firebase.database().ref('messages');

    this.state = {
      rooms: [],
      newRoomName: '',
      show: false
    }
  }

  changeHandler(e) {
    this.setState({ newRoomName: e.target.value});
  }

  submitHandler(e) { // create or add room to firebase database
    e.preventDefault();
    if(this.state.newRoomName) {
      const newRoom = this.roomsRef.push({
        name: this.state.newRoomName.trim()
      });

    // console.log('the new room is >>>', { name: this.state.newRoomName.trim(), key: newRoom.key })
    // re-created the new object to pass to setActiveRoom
    const tempNewRoom = { name: this.state.newRoomName.trim(), key: newRoom.key }
    // console.log('tempNewRoom >>> ', tempNewRoom);
    this.props.setActiveRoom(tempNewRoom);

    // this.state.rooms does not have the current or newly created room
    // console.log('this.state.rooms[] >>> ', this.state.rooms)
    // console.log('this.state.rooms[] >>> ', this.state.rooms[this.state.rooms.length-1] )
    }
  }

  /* hide modal */
  handleHide = () => {
    this.setState({ show: false , newRoomName: '', showRename: false});
  }

  onSelectRoom = (e,room) => {
    e.preventDefault();
    this.props.setActiveRoom(room);
  }

  removeRoom = (room) => {
    this.roomsRef.child(room.key).remove();
    this.props.setActiveRoom('');
  }


//////////////////////////////////////

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;

    //   this.setState({ rooms: this.state.rooms.concat( room ), newRoomName: '', show: false});
    //   console.log('inside RoomList componentDidMount his.state.rooms >>>', this.state.rooms)
    // });

    this.setState((prevState) => ({
      rooms: prevState.rooms.concat(room), newRoomName: '', show: false
    }))
  })

    this.roomsRef.on('child_removed', snapshot => {
      this.setState((prevState, prevProps) => ({
        rooms: prevState.rooms.filter((room) => {
          return (
            room.key !== snapshot.key
          )
        })
       }))

    })
  }  // componentDidMount() {

  componentDidUpdate(prevProps, prevState) {
    // console.log('componentDidUpdate !!!');
  }

/////////////////////////////////////////////

  render() {

    const removeRoomStyle = {
      fontSize: ".8em",
      color: "white",
      background: "darkRed",
      border: "2px solid black",
      borderRadius: "20px",
      float: "right",
      clear: "both"
    }

    const roomList = this.state.rooms.map((room, index) => {
      return (

        <div className="room-list" href="#" key={room.key}>
          <a href="*" onClick={(e) => this.onSelectRoom(e, room)}>{room.name}</a>

          { (this.props.user) && (this.props.user.displayName)  &&
          <button style={removeRoomStyle} onClick={() => this.removeRoom(room)}>delete</button>
          }

        </div>
      )
    })

    return (

      <div>
        {/* Bootstrap Modal for "New room"  */}
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
              {/*Enter a new room name &nbsp;*/}
              <input type="text" onChange={(e) => this.changeHandler(e)} value={this.state.newRoomName} style={{width: 500, height: 40}}
              placeholder={"Enter a new room name"}/> &nbsp;
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.handleHide}>Cancel</Button>
              <Button bsStyle="primary" bsSize="small" onClick={(e) => this.submitHandler(e)}>Submit</Button>
            </Modal.Footer>
          </Modal>
        </div>
        {/* Bootstrap Modal for "New room"  */}

        {
          this.props.user &&
          <Button
            className="move-right"
            bsStyle="primary"
            bsSize="small"
            onClick={() => this.setState({ show: true })}>
            New room
          </Button>
        }

        <h4>{roomList}</h4>

      </div>

    )
  }
}

export default RoomList;
