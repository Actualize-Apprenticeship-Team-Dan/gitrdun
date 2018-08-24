import React, { Component } from 'react';
import firebase from './firebase';

class SignUp extends Component {
  constructor(props){
    super(props)
    this.state={
      error:'',
    }
  }
  componentDidMount() {
    console.log(firebase.auth().currentUser)
  }

  handleSubmit (e) {
    e.preventDefault();
    console.log(firebase)
    let email = e.target.email.value
    let password = e.target.password.value
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      console.log(user)
    }).catch((error) => {
      // Handle Errors here.

    console.log(error)
    var errorCode = error.code;
    var errorMessage = error.message;
    this.setState({error: error.message});
      // ...
    });
  }
  render() {
    let showError = this.state.error ? 'visible':'invisible'
    return (
      <div className="SignUp container w-50">
        <div className={"alert alert-danger error " + showError}>{this.state.error}</div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
        <div className="form-group">
          <label>Enter your email:</label>
          <input className="form-control" name="email"/>
        </div>
        <div className="form-group">
          <label>Enter your password:</label>
          <input className="form-control" name="password" type="password"/>
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
        </form>
     </div>
   )
  }
}