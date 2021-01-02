import React, { useContext, useState } from 'react';
import UsersContext from '../../context/users/usersContext';
import './userForm.scss';

const UserForm = () => {
    const usersContext = useContext(UsersContext);
    const {form, showForm, createUser} = usersContext;

    const [user, saveUser] = useState({
        name: '', 
    })

    const {name} = user;

    const onChangeUser = e =>{
        saveUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();
        if(name === ''){
            alert('The name is required')
        }

        createUser(user)
        
        saveUser({
            name: ''
        })
    }
    return (
        <div className="form-user-container">
            {
                !form ?
                <button
                    type="button"
                    onClick={()=>showForm()}
                >
                    New User
                </button> :
                null
            }
            {
                form ?
                (
                    <form 
                        onSubmit={onSubmit}
                    >
                        <input 
                            type="text"
                            placeholder="User name"
                            name="name"
                            value={name}
                            onChange={onChangeUser}
                            className="input"
                        />
                        <input 
                            type="submit" 
                            value="Add user"
                            className="button"
                        />
                    </form>
                ) : null
            }
        </div>
    );
};

export default UserForm;