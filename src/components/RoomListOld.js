import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

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
      this.setState({ rooms: this.state.rooms.concat( room ), newRoomName: '', show: false }) // concat adds to the rooms; adding from firebase db
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

    this.state.newRoomName ?
      this.roomsRef.push({
        name: this.state.newRoomName
      }) :
      alert('*Please enter a new room name');
  }

  /* hide modal */
  handleHide = () => {
    this.setState({ show: false , newRoomName: ''}); {/* removes newRoomName after hiding */}
    console.log('show >>>', this.state.show)
  }



  render() {
    const roomList = this.state.rooms.map((room) =>
      <div class="room-list" key={room.key}>{room.name}</div>)

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

            {/* <form onSubmit={(e) => this.submitHandler(e)}> */}

              Enter a new room name &nbsp;
              <input type="text" onChange={(e) => this.changeHandler(e)} value={this.state.newRoomName} style={{width: 400, height: 40}} /> &nbsp;

              {/* <input type="submit" /> */}
              <br />
              {/*this.state.newRoomName*/}
            {/*</form>*/}

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Cancel</Button>
            {/* <Button bsStyle="primary" bsSize="medium" onClick={this.handleHide}>Submit*</Button> */}

            <Button bsStyle="primary" bsSize="medium" onClick={(e) => this.submitHandler(e)}>Submit</Button>
          </Modal.Footer>
        </Modal>

      </div>

      <Button
        className="move-right"
        bsStyle="primary"
        bsSize="medium"
        onClick={() => this.setState({ show: true })}>
        {/*onClick={() => this.toggleShow() }> */}
        New room
      </Button>

        {roomList}

        <br />


{/*
        <form onSubmit={(e) => this.submitHandler(e)}>
          <input type="text" onChange={(e) => this.changeHandler(e)} value={this.state.newRoomName} /> &nbsp;
          <input type="submit" />
          <br />
          {this.state.newRoomName}ddd
        </form>

*/}

      </div>

    )
  }
}

export default RoomList;
