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
      filterValue: '',
      showCompleted: false,
      tasks: [],
    };
  }

  componentDidMount() {

    db.collection('tasks').onSnapshot(snapshot => {
      let tasks = [];
      snapshot.forEach(doc => {
        // console.log(doc.data());
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

  moveTask(taskId, direction) {
    let index1 = this.state.tasks.map(t =>  t.id ).indexOf(taskId)
    let tasks = this.state.tasks.slice()
    let task = tasks[index1]
    tasks.splice(index1, 1)
    tasks.splice(index1 + direction, 0,  task)
    this.setState({
      tasks: tasks
    })
  }

  toggleCompleted(task){
    task.completed = !task.completed
    db.collection('tasks').doc(task.id).set(task).then(() => {
      console.log("Document updated successfully");
    }).catch((error) => {
      console.error("Error updating document: ", error);
    });
  }

  filterCompleted(){
    this.setState({
      showCompleted: !this.state.showCompleted
    })
    console.log(this.state.showCompleted)
  }

  filterTasks(e) {
    this.setState({filterValue: e.target.value});
  }

  render() {
    var title = 'Git R Dun';
    let completedFilter = this.state.showCompleted ?
      t => !t.completed :
      t => t
    let textFilter = this.state.filterValue ?
      t => t.text.toLowerCase().includes(this.state.filterValue.toLowerCase()) :
      t => t
    let filteredTasks = this.state.tasks
      .filter(completedFilter)
      .filter(textFilter)

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
        <div className="container">
          <input
            className="form-control col-md-3 mx-auto mt-2"
            placeholder="Search"
            onChange={this.filterTasks.bind(this)}
          />
        </div>
        <button
          className="btn-primary btn mt-2"
          onClick={this.filterCompleted.bind(this)}>
          Show Completed Tasks: {this.state.showCompleted ? "Off" : "On"}
        </button>
        <TaskList
          tasks={filteredTasks}
          removeTask={this.removeTask.bind(this)}
          toggleCompleted={this.toggleCompleted.bind(this)}
          moveTask={this.moveTask.bind(this)}

        />
      </div>

    );
  }
}

export default App;
