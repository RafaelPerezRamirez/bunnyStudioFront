import React, { useContext, useEffect, Fragment } from 'react';
import UsersContext from '../../context/users/usersContext';
import User from '../User/User';
import UserForm from '../UserForm/UserForm';
import './users.scss';

const Users = () => {
    const usersContext = useContext(UsersContext);
    const {users, loading, getUsers} = usersContext;
    useEffect(()=>{
        getUsers();
    }, [])

    return (
        <Fragment>
            <div className="users-container">
                {!loading ?
                    <div className="users-content">
                        {users.map(user =>(
                            <User
                                key={user._id}
                                user={user}
                            />           
                        ))}
                    </div>:
                    <div className="some-dos"></div>
                }
            </div>
            <div className="form-container">
                <UserForm/>
            </div>
        </Fragment>
    );
};

export default Users;