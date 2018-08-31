import React, { Component } from 'react';
import Nav from './Nav'
import './App.css';
import ToDo from './ToDo';
import { Router, Redirect } from "@reach/router";
import SignUp from './SignUp'
import firebase from './firebase';
import SignIn from './SignIn';

class PrivateRoute extends Component {
  render () {
    return this.props.currentUser ? <this.props.component path="/" currentUser={this.props.currentUser} /> : <Redirect to="signin" noThrow />
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }
  componentDidMount () {
    firebase.auth().onAuthStateChanged ((user) => {
      if (user) {
        this.setState({user: user})
        console.log("User is signed in.")
      } else {
        this.setState({user: null})
        console.log("No user is signed in.")
      }
    });
  }

  signOut () {
    firebase.auth().signOut()
    console.log("signout")
  }

  render() {
    return (
      <div>
        <Nav currentUser={this.state.user} signOut={ this.signOut}/>
        <Router>
          <PrivateRoute path="/" currentUser={this.state.user} component={ToDo} />
          <SignUp path="signup" currentUser={this.state.user}/>
          <SignIn path="signin" currentUser={this.state.user}/>
        </Router>
      </div>
    )
  }
}

export default App