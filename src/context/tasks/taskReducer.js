import { 
    GET_USERS_TASKS,
    GET_TASKS_SUCCESS,
    ADD_TASK,
    DELETE_TASK,
    UPDATE_TASK_STATE
} from "./tasksTypes";

export default (state, action) => {
    switch (action.type) {
        case GET_USERS_TASKS:
            return{
                ...state,
                loading: true
            }
        case GET_TASKS_SUCCESS:
            return{
                ...state,
                userTasks: action.payload,
                loading: false
            }
        case ADD_TASK:
            return{
                ...state,
                userTasks: [...state.userTasks, action.payload]
            }
        case DELETE_TASK:
            return{
                ...state,
                userTasks: state.userTasks.filter(task => task._id != action.payload)
            }
        case UPDATE_TASK_STATE:
            return{
                ...state,
                userTasks: state.userTasks.map(task => task._id === action.payload._id ? action.payload : task)
            }
        default:
            return state;
    }
}