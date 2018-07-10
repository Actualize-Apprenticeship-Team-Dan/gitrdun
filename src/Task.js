import React, {Component} from 'react' 

class Task extends Component {
    render() {
        return( 
	        <div className="list-group-item"> {this.props.task} 
		        <button className="btn btn-small btn-danger float-right" onClick={() => this.props.removeTask(this.props.task)}>delete</button> 
	        </div>
        )
    }
}
export default Task;