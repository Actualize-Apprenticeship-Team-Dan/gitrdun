import React, { Component } from 'react';

class TaskList extends Component {

  render() {
    return (
      <ol>
        { this.props.tasks.map(task => <li>{task}</li>) }
      </ol>
    );
  }
}

export default TaskList;