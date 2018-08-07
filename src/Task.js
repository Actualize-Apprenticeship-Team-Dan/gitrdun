import React, {Component} from 'react' 
import './App.css';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaThumbTack from 'react-icons/lib/fa/thumb-tack';
import Moment from 'moment'
import FaArrowCircleDown from 'react-icons/lib/fa/arrow-circle-down'
import FaArrowCircleUp from 'react-icons/lib/fa/arrow-circle-up'
import FaCircle from 'react-icons/lib/fa/circle'
import FaCheckCircle from 'react-icons/lib/fa/check-circle'

class Task extends Component {
    render() {
        return( 
	        <div className={`list-group-item ${this.props.task.completed ? 'list-group-item-success': ''}`}> 
            <div className="row">
	            <FaThumbTack className="col-xs-1 d-none d-sm-block float-left" size={50} style={{paddingRight:10}} />
	            <div className="col col-xs-8">
	              <small>{Moment(this.props.task.date.toDate()).format('l')} </small>
	              <h5>{this.props.task.text}</h5>
	            </div>
		          <div className="col col-xs-3">
			          <div className="btn-group float-right">
			            <button 
			            	className="btn btn-primary"
			            	onClick={() => this.props.toggleCompleted(this.props.task)}
			            >
			            	{this.props.task.completed ? <FaCheckCircle size={30}/> : <FaCircle size={30}/>}
			            </button>
			            {this.props.order < this.props.length - 1 &&
			            	<button 
			            	  className="btn btn-small btn-success float-right" 
										  onClick={() => this.props.moveTask(this.props.task.id, 1)}
						        >
							        <FaArrowCircleDown size={30} />
						        </button>
							    }
							    {this.props.order > 0 &&
						        <button 
							        className="btn btn-small btn-success float-right" 
										  onClick={() => this.props.moveTask(this.props.task.id, -1)}
						        >
							        <FaArrowCircleUp size={30} />
						        </button> 
							    }
			            <button 
			              className="btn btn-small btn-danger float-right" 
							      onClick={() => this.props.removeTask(this.props.task.id)}
			            >
							      <FaTrashO size={30} />
			            </button> 
				        </div>
			      	</div>
		        </div>
		      </div>
        )
    }
}
export default Task;