import React, { Component } from 'react';
import AddTask from './AddTask';
import Nav from './Nav'
import TaskList from './TaskList';
import './App.css';
import FaAngellist from 'react-icons/lib/fa/angellist';
import db from './firebase';
import {arrayMove} from 'react-sortable-hoc';
import ToDo from './ToDo';
import { Router, Link } from "@reach/router";

class SignUp extends Component {
  render(){
    return <h1> Sign Up </h1>
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Nav/>
        <Router>
          <ToDo path="/" />
          <SignUp path="signup" />
        </Router>
      </div>
    )
  }
}

export default App