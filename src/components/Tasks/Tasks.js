import React, { useContext, Fragment, useState, useEffect } from 'react';
import TasksContext from '../../context/tasks/tasksContext';
import UsersContext from '../../context/users/usersContext';
import TaskForm from '../TaskForm/TaskForm';
import TodoList from '../ToDoList.js/TodoList';
import EmptyTasks from './EmptyTasks';
import './tasks.scss'

const Tasks = () => {
    const tasksContext = useContext(TasksContext);
    const { userTasks } = tasksContext;

    const usersContext = useContext(UsersContext);
    const { selected } = usersContext;

    const [toDo, saveToDo] = useState([]);
    const [done, saveDone] = useState([]);
    
    useEffect(() =>{
        if(userTasks.length > 0){
            const todoTasks = userTasks.filter(task => task.state === 0);
            saveToDo(todoTasks)

            const doneTasks = userTasks.filter(task => task.state === 1);
            saveDone(doneTasks)
        }
    }, [userTasks])
    
    return (
        <Fragment>
            {!selected 
                ?
                <EmptyTasks
                    text={"Choose an user to view it's tasks"}
                />
                :
                <div>
                    <div 
                        className={userTasks.length > 0 ? "tasks-container container-padding" : "tasks-container"}
                    >
                        {userTasks.length === 0 
                            ? 
                            <EmptyTasks
                                text={'There are no tasks'}
                            />
                            :
                            <TodoList 
                                toDo={toDo}
                                done={done}
                            />
                        }
                    </div>
                    <TaskForm/>
                </div>
            }
        </Fragment>
    );
};

export default Tasks;