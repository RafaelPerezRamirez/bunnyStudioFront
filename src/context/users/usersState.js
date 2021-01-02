import React, { useReducer } from 'react';
import UsersContext from './usersContext';
import usersReducer from './usersReducer';
import httpCommon from '../../http-common';
import Swal from 'sweetalert2'
import { 
    GET_USERS, 
    GET_USERS_SUCCESS, 
    USER_SELECTED,
    USER_FORM,
    ADD_USER,
    DELETE_USER 
} from './usersTypes';

const UsersState = props =>{
    const usersState = {
        users: [],
        loading: false,
        userSelected: null,
        form: false
    }
    const [state, dispatch] = useReducer(usersReducer, usersState);

    const getUsers = async () =>{
        try {
            const users = await httpCommon.get('/users');
            getUsersSuccess(users.data.users);
            dispatch({
                type: GET_USERS
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getUsersSuccess = users =>{
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: users
        })
    }

    const createUser = async user =>{
        try {
            const newUser = await httpCommon.post('/users', user)
            Swal.fire('User created', 'The user have been created', 'success')
            dispatch({
                type: ADD_USER,
                payload: newUser.data
            })
        } catch (error) {
            Swal.fire('Oops...', error.response.data.msg, 'error')
            console.log(error);
        }
    }

    const deleteUser = async userId =>{
        try {
            const userDeleted = await httpCommon.delete(`/users/${userId}`)
            Swal.fire('User deleted', 'The user have been deleted', 'success')
            dispatch({
                type: DELETE_USER,
                payload: userId
            })
        } catch (error) {
            console.log(error);
        }
    }

    const userSelected = user =>{
        dispatch({
            type: USER_SELECTED,
            payload: user
        })
    }

    const showForm = () =>{
        dispatch({
            type: USER_FORM,
        })
    }

    return(
        <UsersContext.Provider value={{
            users: state.users,
            form: state.form,
            selected: state.userSelected,
            getUsers,
            userSelected,
            showForm,
            createUser, 
            deleteUser
        }}>
            {props.children}
        </UsersContext.Provider>
    )

}

export default UsersState;
