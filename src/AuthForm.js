import React, { Component } from 'react';
import './AuthForm.css';
class AuthForm extends Component {

 render() {
  let showError = this.props.error ? 'd-block':'d-none'
  return (
    <div className="SignUp card container w-25 mt-5 gray">
      <h3 className="mt-3">{this.props.title}</h3>
      <div className={"alert alert-danger error " + showError}>{this.props.error}</div>
      <form onSubmit={(e) => this.props.handleSubmit(e)}>
        <div className="form-group">
          <label>Email:</label>
          < input className = "form-control gray-out"
          name = "email"
          value = "abc@123.com" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input className="form-control" name="password" type="password" />
        </div>
        <button className="btn btn-primary mb-3 w-100" type="submit">Submit</button>
      </form>
     </div>
   )
  }
}

export default AuthForm