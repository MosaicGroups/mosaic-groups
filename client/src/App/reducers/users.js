import {
    REQUEST_USERS, RECEIVE_USERS
} from '../actions/users';


const users = (state = {
    isFetching: false,
    hasUsers: false
}, action) => {
    switch (action.type) {
        case REQUEST_USERS:
            return {
                ...state,
                isFetching: true
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