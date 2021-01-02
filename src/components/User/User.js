import React, {useContext, useState} from 'react';
import TasksContext from '../../context/tasks/tasksContext';
import UsersContext from '../../context/users/usersContext';
import './user.scss';

const User = ({user}) => {
    const usersContext = useContext(UsersContext);
    const { userSelected, deleteUser, selected } = usersContext;

    const tasksContext = useContext(TasksContext);
    const { getUserTasks } = tasksContext;

    const [userActive, saveUserActive] = useState({
        id: null
    });

    const selectUser = id =>{
        userSelected(id);
        getUserTasks(id);
        saveUserActive({
            id: id
        })
    }
    return (
        <div className={selected === user._id ? 'user-container userActive' : 'user-container'}>
            <div 
                className="user-name" 
                onClick={()=>selectUser(user._id)}
            >
                {user.name}
            </div>
            <div 
                className="close-icon" 
                onClick={()=>deleteUser(user._id)}
            >
                <i className="far fa-times-circle"></i>
            </div>
        </div>
    );
};

export default User;