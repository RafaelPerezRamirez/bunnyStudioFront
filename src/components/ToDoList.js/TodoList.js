import React from 'react';
import Task from '../Task/Task';
import './todoList.scss';

const TodoList = ({toDo, done}) => {
    return (
        <div className="todolist-container">
            <div className="list-todo">
                <h2>To do list</h2>
                {
                    toDo.map(task =>(
                        <Task
                            key={task._id}
                            task={task}
                        />
                    ))
                }
            </div>
            <div className="list-done">
                <h2>Done list</h2>
                {
                    done.map(task =>(
                        <Task
                            key={task._id}
                            task={task}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default TodoList;