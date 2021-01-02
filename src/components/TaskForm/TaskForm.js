import React, { Fragment, useState, useContext } from 'react';
import TasksContext from '../../context/tasks/tasksContext';
import UsersContext from '../../context/users/usersContext';
import './taskform.scss';

const TaskForm = () => {
    const usersContext = useContext(UsersContext);
    const { selected } = usersContext;

    const tasksContext = useContext(TasksContext);
    const { createTask } = tasksContext;

    const [task, saveTask] = useState({
        description: '',
        userId: null 
    })

    const {description} = task;

    const onChangeTask = e =>{
        saveTask({
            ...task,
            [e.target.name] : e.target.value,
            userId: selected
        })
    }

    const onSubmit = e =>{
        e.preventDefault();
        if(task === ''){
            alert('The name is required')
        }

        createTask(task)
        
        saveTask({
            description: ''
        })
    }
    return (
        <div className="task-form-container">
            <form 
                onSubmit={onSubmit}
            >
                <input 
                    type="text"
                    placeholder="Task name"
                    name="description"
                    value={description}
                    onChange={onChangeTask}
                    className="input"
                />
                <input 
                    type="submit" 
                    value="Add task"
                    className="button"
                />
            </form>
        </div>
    );
};

export default TaskForm;