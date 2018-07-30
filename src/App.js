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
      isHidden: false,
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

  hideCompleted(tasks){
    // if ()
    db.collection('tasks').onSnapshot(snapshot => {
      let uncompletedTasks = [];
      snapshot.forEach(doc => {
        if (doc.data().completed === false) {
        uncompletedTasks.push(doc.data())};
      })
      console.log(uncompletedTasks);
      this.setState({ tasks: uncompletedTasks });
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

  render() {
    var title = 'Git R Dun';
    var tasks = this.state.showCompleted ? this.state.tasks.filter(t => !t.completed) : this.state.tasks

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
          hideCompleted={this.hideCompleted.bind(this)} 
          tasks={this.state.tasks}
        <button onClick={this.filterCompleted.bind(this)}> Filter </button>
      </div>

    );
  }
}

export default App;
