import React, { Component } from 'react';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';

class AddTask extends Component {

  showAlert(){
    window.alert("Please add task");
  }

  onEnter(e) {
    if (e.keyCode === 13) {
      this.props.addTask()
    }
  }
  
  render() {
    return (
      <div className="container">
        <div className="input-group">    
          <input 
            className="form-control"
            value={this.props.inputValue}
            onChange={this.props.handleChange}
            onKeyUp={(e) => this.onEnter(e)}
            placeholder="Enter a Task">
          </input>
          <div className="input-group-append">
            <button 
              className="btn-primary btn" 
              onClick={
                 this.props.inputValue === "" ? 
                 this.showAlert:
                 this.props.addTask
              }><FaPlusCircle />
            </button>
          </div>
        </div>
      </div>  
    );
  }
}

export default AddTask;