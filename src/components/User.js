import React, { Component } from 'react';
import './User.css';
import { Button } from 'react-bootstrap';

class User extends Component {

  signIn = () => {
    // console.log('signInWithPopup was clicked !!!');
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider )
  }

  signOut = () => {
    console.log('signOut was clicked !!!');
    this.props.firebase.auth().signOut()
  }

  componentDidMount() {
    // console.log('User componentDidMount !!!');
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
      // console.log('checking the user >>>', this.props.user)
      // console.log('checking the user >>>', this.props.user.email)
      // console.log('checking the user >>>', this.props.user.displayName)
    });
  }

  render() {

    return (

      <div>

        { this.props.user
          ? <Button bsStyle="primary" bsSize="small" onClick={this.signOut}>Sign Out</Button>
          : <Button bsStyle="primary" bsSize="small" onClick={this.signIn} >Sign In</Button>
        }

<<<<<<< HEAD
        {/* this.props.user ? ' ' + this.props.user.displayName.split(' ')[0]: ' Guest' */}
        { this.props.user ? ' ' + this.props.user.displayName: ' Guest' }
=======
        { this.props.user ? ' ' + this.props.user.displayName : ' Guest' }
>>>>>>> 5-send-messages

      </div>

    )
  } // eo render

} // eo User component

export default User;
