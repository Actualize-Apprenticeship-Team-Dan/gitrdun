import React from 'react';
import Task from './Task'
import {SortableContainer} from 'react-sortable-hoc'

const TaskList = SortableContainer (props  => {
    return (
      <div className="container">
        <div className="list-group">
          {
            props.tasks.map((task, index) => 
              <Task 
                task={task}
                key={task.id} 
                removeTask={props.removeTask}
                toggleCompleted={props.toggleCompleted}
                moveTask={props.moveTask}
                direction={task.direction}
                order={index}
                length={props.tasks.length}
                index={index}
              /> 
        )}
       </div>
     </div>
    );
  })

export default TaskList;