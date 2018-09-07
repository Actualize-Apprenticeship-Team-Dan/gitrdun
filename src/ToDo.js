import React, { Component } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import './App.css';
import FaAngellist from 'react-icons/lib/fa/angellist';
import FaCheckCircleO from 'react-icons/lib/fa/check-circle-o'
import FaCheckCircle from 'react-icons/lib/fa/check-circle'
import FaUser from 'react-icons/lib/fa/user'
import FaGroup from 'react-icons/lib/fa/group'
import firebase from './firebase';
import { arrayMove } from 'react-sortable-hoc'


class ToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      filterValue: '',
      showCompleted: false,
      showAllTasks: true,
      tasks: [],
    };
  }

  componentDidMount() {

    firebase.firestore().collection('tasks').onSnapshot(snapshot => {
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

    firebase.firestore().collection('tasks').doc(id).set({
      text: this.state.inputValue,
      date: new Date(),
      completed: false,
      id: id,
      user: this.props.currentUser.email
    }).then(() => {
      this.setState({ inputValue: "" })
    }).catch((error) => {
      console.log("error adding document", error)
    })
  }

  removeTask(taskId) {
    firebase.firestore().collection('tasks').doc(taskId).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  moveTask(taskId, direction) {
    let index = this.state.tasks.map(t => t.id).indexOf(taskId)
    let tasks = this.state.tasks.slice()
    let movedTask = tasks[index]
    let bumpedTask = tasks[index + direction]
    let tempId = movedTask.id
    movedTask.id = bumpedTask.id
    bumpedTask.id = tempId
    this.updateTask(movedTask);
    this.updateTask(bumpedTask);
  }

  dragTask(oldIndex, newIndex) {
    let tasks = this.state.tasks.slice()
    let low = oldIndex < newIndex ? oldIndex : newIndex
    let high = oldIndex > newIndex ? oldIndex : newIndex
    for (let i = low; i < high; i++) {
      let movedTask = tasks[i]
      let bumpedTask = tasks[i + 1]
      let tempId = movedTask.id
      movedTask.id = bumpedTask.id
      bumpedTask.id = tempId
      this.updateTask(movedTask);
      this.updateTask(bumpedTask);
      if (oldIndex < newIndex) {
        tasks[i + 1] = tasks[i]
      } else {
        tasks[i - 1] = tasks[i]
      }
    }
  }

  toggleCompleted(task) {
    task.completed = !task.completed
    this.updateTask(task)
  }

  updateTask(task) {
    firebase.firestore().collection('tasks').doc(task.id).set(task).then(() => {
      console.log("Document updated successfully");
    }).catch((error) => {
      console.error("Error updating document: ", error);
    });
  }

  filterCompleted() {
    this.setState({
      showCompleted: !this.state.showCompleted
    })
    console.log(this.state.showCompleted)
  }

  filterTasks(e) {
    this.setState({ filterValue: e.target.value });
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.dragTask(oldIndex, newIndex)
    this.setState({
      tasks: arrayMove(this.state.tasks, oldIndex, newIndex),
    });
  };

  filterUserTasks = () => {
    this.setState({
      showAllTasks: !this.state.showAllTasks
    })
    console.log(this.state.showAllTasks)
  }

  render() {
    let completedFilter = this.state.showCompleted ?
      t => !t.completed :
      t => t
    let textFilter = this.state.filterValue ?
      t => t.text.toLowerCase().includes(this.state.filterValue.toLowerCase()) ||
        t.user.toLowerCase().includes(this.state.filterValue.toLowerCase()) :
      t => t
    let userFilter = this.state.showAllTasks ?
      t => t :
      t => t.user === this.props.currentUser.email
      
    let filteredTasks = this.state.tasks
      .filter(completedFilter)
      .filter(textFilter)
      .filter(userFilter)

    return (
      <div className="App">
        <div className="container">
          <div>
              <input
                className="form-control col-md-3 mt-5 mb-2"
                placeholder="Search"
                onChange={this.filterTasks.bind(this)}
              />
            <span className="float-left" onClick = {this.filterCompleted.bind(this)}>
              {this.state.showCompleted ? <FaCheckCircleO size={30}/> : <FaCheckCircle size={30}/>}
            </span>
            <span onClick = {this.filterUserTasks}>
              {this.state.showAllTasks ? <FaGroup size={30}/> : <FaUser size={30}/>}
            </span>
          </div>
        </div>
        <TaskList
          tasks={filteredTasks}
          removeTask={this.removeTask.bind(this)}
          toggleCompleted={this.toggleCompleted.bind(this)}
          moveTask={this.moveTask.bind(this)}
          onSortEnd={this.onSortEnd}
          useDragHandle={true}

        />
      </div>
    );
  }
}

export default ToDo;
