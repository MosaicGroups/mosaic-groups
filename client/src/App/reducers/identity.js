import {
    REQUEST_AUTHENTICATION, RECEIVE_AUTHENTICATION
} from '../actions/identity';

const identity = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_AUTHENTICATION:
            return state;
        case RECEIVE_AUTHENTICATION:
            return Object.assign({}, state, action.user);
        default:
            return state;
    }
};
export default identity;