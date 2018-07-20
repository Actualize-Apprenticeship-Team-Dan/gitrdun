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

    db.collection('tasks').onSnapshot(snapshot => {
      let tasks = [];
      snapshot.forEach(doc => {
        console.log(doc.data())
        tasks.push(doc.data());
      })
      this.setState({ tasks: tasks });
    })
  }

  handleChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  addTask() {
    let id = new Date().getTime().toString()

    db.collection('tasks').doc(id).set({
      text: this.state.inputValue,
      date: new Date(),
      completed: false, 
      id: id
    }).then(() => {
      this.setState({inputValue: ""})
    }).catch((error) => {
      console.log("error adding document", error)
    })
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
