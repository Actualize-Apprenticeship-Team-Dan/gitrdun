import React, { Component } from 'react';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import DatePicker from 'react-date-picker';


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
      <div className="container p-2">
      <h4 className="text-center addtask-banner">Add Task and Due Date:</h4>
        <div className="input-group mt-3">    
          <input 
            className="form-control addtask-input"
            value={this.props.inputValue}
            onChange={this.props.handleChange}
            onKeyUp={(e) => this.onEnter(e)}
            placeholder="Enter a Task">
          </input>
          <DatePicker
              onChange={this.props.dateChange}
              value={this.props.dueDate}
            />

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