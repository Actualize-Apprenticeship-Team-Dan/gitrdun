import React, { Component } from 'react';
import AddTask from './AddTask';
import Nav from './Nav'
import TaskList from './TaskList';
import './App.css';
import FaAngellist from 'react-icons/lib/fa/angellist';
import db from './firebase';
import {arrayMove} from 'react-sortable-hoc';
import ToDo from './ToDo';
import { Router, Redirect } from "@reach/router";
import SignUp from './SignUp'
import firebase from './firebase';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     fakeAuth.isAuthenticated === true
//       ? <Component {...props} />
//       : <Redirect to='/login' />
//   )} />
// )

class PrivateRoute extends Component {
  render () {
    return this.props.currentUser ? <this.props.component path="/" /> : <Redirect to="signup" noThrow />
    
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

  render() {
    return (
      <div>
        <Nav/>
        <Router>
          <PrivateRoute path="/" currentUser={this.state.user} component={ToDo} />
          <SignUp path="signup" />
        </Router>
      </div>
    )
  }
}

export default App