import React, {Component} from 'react' 
import './App.css';

class Task extends Component {
    render() {
        return( 
	        <div className={`list-group-item ${this.props.task.completed ? 'list-group-item-success': ''}`}> {this.props.task.text} 
		        <button className="btn btn-small btn-danger float-right" onClick={() => this.props.removeTask(this.props.task.text)}>delete</button> 
		        <div className="form-check form-group float-right pr-5">
			        <input 
			        	className="form-check-input"
			        	onClick={() => this.props.toggleCompleted(this.props.task)}
			        	type="checkbox"  
			        	id="exampleCheck1" 
			        	checked={this.props.task.completed}
		        	/>
		        	<label className="form-check-label">
					 	Completed
					</label>
				</div>
	        </div>
        )
    }
}
export default Task;