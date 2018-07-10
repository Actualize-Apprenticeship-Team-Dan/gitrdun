import React, {Component} from 'react' 

class Task extends Component {
    render() {
        return <div className="list-group-item"> {this.props.task} </div>
    }
}
export default Task;