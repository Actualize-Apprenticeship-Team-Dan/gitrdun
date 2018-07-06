import React, { Component } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      tasks: []
    };
  }

  handleChange(value) {
    this.setState({ inputValue: value });
  }

  addTask() {
    var tasks = this.state.tasks.slice();
    tasks.push(this.state.inputValue);
    this.setState({
      tasks: tasks,
      inputValue: ''
    });
  }

  render() {
    var title = 'Git R Dun';

    return (
      <div className="App">
        <h1>{title}</h1>

        <div className="input-group">    
          <input 
            className="form-control"
            value={this.state.inputValue}
            onChange={e => this.handleChange(e.target.value)}
            placeholder="Enter a Task">
          </input>
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={e => this.addTask()}>Add</button>
          </div>
        </div>
        <TaskList tasks={this.state.tasks} />
      </div>

    );
  }
}

export default App;
