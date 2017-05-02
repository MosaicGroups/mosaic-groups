import {
    REQUEST_GROUPS, RECEIVE_GROUPS, ADD_GROUP, UPDATE_GROUP
} from '../actions/groups';


const groups = (state = {
    isFetching: false,
    hasGroups: false
}, action) => {
    let stateGroups;
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
        case ADD_GROUP:
            stateGroups = state.groups.concat(action.group);
            return {
                ...state,
                groups: stateGroups
            };
        case UPDATE_GROUP:
            stateGroups = state.groups;
            let updateIndex = stateGroups.findIndex(g => g._id == action.group._id);
            stateGroups[updateIndex] = action.group;
            return {
                ...state,
                groups: stateGroups
            };
        default:
            return state;
    }
};

export default groups;