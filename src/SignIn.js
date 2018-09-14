import React, { Component } from 'react';
import firebase from './firebase';
import AuthForm from './AuthForm';
import {Redirect} from "@reach/router";

class SignIn extends Component {
  constructor(props){
    super(props)
    this.state={
      error:'',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let email = e.target.email.value
    let password = e.target.password.value
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      console.log('you are signed in');
    }).catch((error) => {
      this.setState({error: error.message});
    });
  }

  render() {
    if (this.props.currentUser) {
      return <Redirect to="/" noThrow />
    }
    return <AuthForm title='Sign In' handleSubmit={this.handleSubmit} error={this.state.error} />
  }
}

export default SignIn