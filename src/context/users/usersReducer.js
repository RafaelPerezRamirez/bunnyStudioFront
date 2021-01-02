import { 
    GET_USERS, 
    GET_USERS_SUCCESS,
    USER_SELECTED,
    USER_FORM,
    ADD_USER,
    DELETE_USER 
} from "./usersTypes";

export default (state, action) =>{
    switch (action.type) {
        case GET_USERS:
            return{
                ...state,
                loading: true
            }
        case GET_USERS_SUCCESS:
            return{
                ...state,
                users: action.payload,
                loading: false
            }
        case USER_SELECTED:
            return{
                ...state,
                userSelected: action.payload
            }
        case USER_FORM:
            return{
                ...state,
                form: true
            }
        case ADD_USER:
            return{
                ...state,
                users: [...state.users, action.payload]
            }
        case DELETE_USER:
            return{
                ...state,
                users: state.users.filter(user => user._id != action.payload)
            }
        default:
            return state;
    }
}