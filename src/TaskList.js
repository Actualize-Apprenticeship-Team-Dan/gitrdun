import React, { Component } from 'react';
import Task from './Task'
class TaskList extends Component {

  render() {
    return (
      <div className="container mt-5">
        <div className="list-group">
          {
            this.props.tasks.map((task, index) => 
              <Task 
                task={task} 
                key={task.text} 
                removeTask={this.props.removeTask}
                toggleCompleted={this.props.toggleCompleted}
              /> 
        )}
       </div>
     </div>
    );
  }
}

export default TaskList;