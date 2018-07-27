import React, { Component } from 'react';
import Task from './Task'
class TaskList extends Component {

  render() {
    return (
      <div className="container mt-5">
        <div className="mb-2">
          <input 
                  className="form-check-input"
                  onChange={() => this.props.hideCompleted(this.props.tasks)}
                  type="checkbox"   
                  // checked={this.props.task.completed}
          />
          <label className="form-check-label">Hide Completed</label>
        </div>  
        <div className="list-group">
          {
            this.props.tasks.map((task, index) => 
              <Task 
                task={task} 
                key={task.id} 
                removeTask={this.props.removeTask}
                hideCompleted={this.props.hideCompleted}
                toggleCompleted={this.props.toggleCompleted}
              /> 
        )}
       </div>
     </div>
    );
  }
}

export default TaskList;