import React, { Component } from 'react';

class AddTask extends Component {

  constructor (props){
    super(props)
  }

  render() {
    return (
      <div className="container">
        <div className="input-group">    
          <input 
            className="form-control"
            value={this.props.inputValue}
            onChange={this.props.handleChange}
            placeholder="Enter a Task">
          </input>
          <div className="input-group-append">
            <button 
              className="btn btn-primary" 
              onClick={this.props.addTask}>Add</button>
          </div>
        </div>
      </div>  
    );
  }
}

export default AddTask;