import React, {Component} from 'react' 
import './App.css';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaThumbTack from 'react-icons/lib/fa/thumb-tack';
import Moment from 'moment'
import FaArrowCircleDown from 'react-icons/lib/fa/arrow-circle-down'
import FaArrowCircleUp from 'react-icons/lib/fa/arrow-circle-up'

class Task extends Component {
    render() {
        return( 
	        <div className={`list-group-item ${this.props.task.completed ? 'list-group-item-success': ''}`}> 
            <FaThumbTack size={50} style={{paddingRight:10}} />
			{Moment(this.props.task.date).format('l')} {this.props.task.text}
			<button className="btn btn-small btn-danger float-right" 
				        onClick={() => this.props.removeTask(this.props.task.id)}
		        >
				        <FaTrashO size={30} />
		        </button>
				<button className="btn btn-small btn-success float-right" 
						onClick={() => this.props.moveTask(this.props.task.id, 1)}
		        >
				        <FaArrowCircleDown size={30} />
		        </button>
		        <button className="btn btn-small btn-success float-right" 
						onClick={() => this.props.moveTask(this.props.task.id, -1)}
		        >
				        <FaArrowCircleUp size={30} />
		        </button> 
		        <div className="form-check form-group float-right pr-5">
			        <input 
			        	className="form-check-input"
			        	onChange={() => this.props.toggleCompleted(this.props.task)}
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