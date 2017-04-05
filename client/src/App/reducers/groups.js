import {
    REQUEST_GROUPS, RECEIVE_GROUPS
} from '../actions/groups';


const groups = (state = {
    isFetching: false,
    hasUsers: false
}, action) => {
    switch (action.type) {
        case REQUEST_GROUPS:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_GROUPS:
            return Object.assign({}, state, {
                isFetching: false,
                hasGroups: true
            }, { groups: action.groups });
        default:
            return state;
    }
};

export default groups;