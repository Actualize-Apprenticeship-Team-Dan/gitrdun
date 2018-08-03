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
                key={task.id} 
                removeTask={this.props.removeTask}
                toggleCompleted={this.props.toggleCompleted}
                moveTask={this.props.moveTask}
                direction={task.direction}
                order={index}
                length={this.props.tasks.length}
                updateFirebaseOnMove={this.props.updateFirebaseOnMove}
              /> 
        )}
       </div>
     </div>
    );
  }
}

export default TaskList;