import React, { Component } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import './App.css';
import FaAngellist from 'react-icons/lib/fa/angellist';
import db from './firebase';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      tasks: [],
    };
  }

  componentDidMount() {
    let tasks = [];
    db.collection('tasks').onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        tasks.push(doc.data());
      })
      this.setState({ tasks: tasks });
    })
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  addTask() {
    var tasks = this.state.tasks.slice();
    tasks.push({
      text: this.state.inputValue,
      date: new Date(),
      completed: false
    });

    this.setState({
      tasks: tasks,
      inputValue: ''
    });
  }

  removeTask(taskId) {
    db.collection('tasks').doc(taskId).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
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
        <h1 className="title"> 
        <FaAngellist />
        {title} 
        </h1>
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
