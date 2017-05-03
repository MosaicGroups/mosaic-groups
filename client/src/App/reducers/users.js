import {
    REQUEST_USERS, RECEIVE_USERS, DELETE_USER, ADD_USER, UPDATE_USER
} from '../actions/users';


const users = (state = {
    isFetching: false,
    hasUsers: false
}, action) => {
    let stateUsers;
    switch (action.type) {
        case REQUEST_USERS:
            return {
                ...state,
                isFetching: true
            };
        case DELETE_USER:
            const userId = action.user._id;
            return Object.assign({},
                state, { users: state.users.filter(user => user._id !== userId) }
            );
            return state;
        case ADD_USER:
            if (state.users) {
                stateUsers = state.users.concat(action.user);
            } else {
                stateUsers = [action.user];
            }
            return {
                ...state,
                users: stateUsers
            };
        case UPDATE_USER:
            stateUsers = state.users;
            let updateIndex = stateUsers.findIndex(u => u._id == action.user._id);
            stateUsers[updateIndex] = action.user;
            return {
                ...state,
                users: stateUsers
            };
        case RECEIVE_USERS:
            return Object.assign({}, state, {
                isFetching: false,
                hasUsers: true
            }, { users: action.users });
        default:
            return state;
    }
};

export default users;