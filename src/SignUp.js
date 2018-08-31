import React, { Component } from 'react';
import firebase from './firebase';
import AuthForm from './AuthForm';
import {Redirect} from "@reach/router";

class SignUp extends Component {
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
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      console.log('you have signed up')
    }).catch((error) => {
      this.setState({error: error.message});
    });
  }
  
  render() {
    if (this.props.currentUser) {
      return <Redirect to="/" noThrow />
    }
    return <AuthForm title='Sign Up' handleSubmit={this.handleSubmit} error={this.state.error} />
  }
}

export default SignUp