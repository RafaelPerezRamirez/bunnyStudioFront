import React, { useReducer } from 'react';
import httpCommon from '../../http-common';
import taskReducer from './taskReducer';
import TasksContext from './tasksContext';
import Swal from 'sweetalert2'
import { 
    GET_USERS_TASKS,
    GET_TASKS_SUCCESS,
    ADD_TASK,
    DELETE_TASK,
    UPDATE_TASK_STATE 
} from './tasksTypes';

const TasksState = props =>{
    const taskState = {
        userTasks: [],
        loading: false,
        taskSelected: null
    }

    const [state, dispatch] = useReducer(taskReducer, taskState)

    const getUserTasks = async userId =>{
        try {
            const tasks = await httpCommon.get('/tasks', { params: { userId }})
            getTasksSuccess(tasks.data.tasks);
            dispatch({
                type: GET_USERS_TASKS
            })
        } catch (error) {
            Swal.fire('Oops...', error.response.data.msg, 'error')
            getTasksSuccess('');
        }
    }

    const getTasksSuccess = tasks =>{
        dispatch({
            type: GET_TASKS_SUCCESS,
            payload: tasks
        })
    }

    const createTask = async task =>{
        try {
            const newTask = await httpCommon.post('/tasks', task);
            dispatch({
                type: ADD_TASK,
                payload: newTask.data
            })
            Swal.fire('Task created', 'The task have been created', 'success')
        } catch (error) {
            Swal.fire('Oops...', error.response.data.msg, 'error')
            console.log(error)
        }
    }

    const updateState = async task =>{
        try {
            const taskUpdated = await httpCommon.put(`/tasks/${task._id}`, {state: task.state})
            dispatch({
                type: UPDATE_TASK_STATE,
                payload: taskUpdated.data.taskExist
            })
            Swal.fire('Task updated', 'The task have been updated', 'success')
        } catch (error) {
            Swal.fire('Oops...', error.response.data.msg, 'error')
            console.log(error)
        }
    }

    const deleteTask = async taskId =>{
        try {
            const taskDeleted = await httpCommon.delete(`/tasks/${taskId}`)
            dispatch({
                type: DELETE_TASK,
                payload: taskId
            })
            Swal.fire('Task deletec', 'The task have been deleted', 'success')

        } catch (error) {
            Swal.fire('Oops...', error.response.data.msg, 'error')
            console.log(error)
        }
    }

    return(
        <TasksContext.Provider value={{
            userTasks: state.userTasks,
            getUserTasks,
            createTask,
            deleteTask,
            updateState
        }}>
            {props.children}
        </TasksContext.Provider>
    )
}

export default TasksState;