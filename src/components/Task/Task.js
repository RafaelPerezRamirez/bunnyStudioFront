import React, {useContext} from 'react';
import TasksContext from '../../context/tasks/tasksContext';
import './task.scss';

const Task = ({task}) => {
    const taskContext = useContext(TasksContext);
    const { deleteTask, updateState } = taskContext;
    
    const markAsDone = taskId =>{
        const taskUpdated = {
            _id: taskId,
            state: 1
        }
        updateState(taskUpdated)
    }

    return (
        <div className="task-container">
            <div className="left-task">
                <p className="description">{task.description}</p>
                <p 
                    className="close-container"
                    onClick={()=> deleteTask(task._id)}
                >
                    <i className="far fa-times-circle"></i>
                </p>
            </div>
            {   
                task.state === 0 
                ?
                <div className="right-task">
                    <input 
                        type="submit" 
                        className="button" 
                        value="Mark as done"
                        onClick={()=> markAsDone(task._id)}
                    />
                </div>
                :
                null
            }
        </div>
    );
};

export default Task;