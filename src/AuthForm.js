import React, { Component } from 'react';

class AuthForm extends Component {

 render() {
  let showError = this.props.error ? 'visible':'invisible'
  return (
    <div className="SignUp container w-50">
      <h3>{this.props.title}</h3>
      <div className={"alert alert-danger error " + showError}>{this.props.error}</div>
      <form onSubmit={(e) => this.props.handleSubmit(e)}>
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

export default AuthForm