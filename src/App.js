import React, { Component } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      tasks: [],
    };
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  addTask() {
    var tasks = this.state.tasks.slice();
    tasks.push({
      text: this.state.inputValue,
      completed: false
    });

    this.setState({
      tasks: tasks,
      inputValue: ''
    });
  }

  removeTask(removedTask) {
    var filteredTasks = this.state.tasks.filter(task => (removedTask !== task.text))
    this.setState({
      tasks: filteredTasks
    })
  }

  toggleCompleted(completedTask){
    var updatedTasks = this.state.tasks.map(task => {
      if(task.text === completedTask.text) {
        task.completed = !task.completed
      }
    return task
    })
    this.setState({
      tasks: updatedTasks
    })

  }

  render() {
    var title = 'Git R Dun';

    return (
      <div className="App">
        <h1 className="title"> {title}</h1>
        <AddTask 
          inputValue={this.state.inputValue} 
          handleChange={this.handleChange.bind(this)}
          addTask={this.addTask.bind(this)} 
        />
        <TaskList 
          tasks={this.state.tasks}
          removeTask={this.removeTask.bind(this)}
          toggleCompleted={this.toggleCompleted.bind(this)}
        />

      </div>

    );
  }
}

export default App;
