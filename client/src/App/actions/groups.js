import * as request from 'superagent';
import { push } from 'react-router-redux';

export const REQUEST_GROUPS = 'REQUEST_GROUPS';
export const RECEIVE_GROUPS = 'RECEIVE_GROUPS';
export const ADD_GROUP = 'ADD_GROUP';
export const UPDATE_GROUP = 'UPDATE_GROUP';

export const requestGroups = () => ({
    type: REQUEST_GROUPS
});

export const receiveGroups = response => ({
    type: RECEIVE_GROUPS,
    groups: response.body
});

const getGroups = () => dispatch => {
    dispatch(requestGroups());
    return request.get('/api/groups')
        .then(response => {
            return dispatch(receiveGroups(response));
        });
};
const shouldFetchGroups = (state) => {
    const groups = state.groups;
    if (groups && (groups.hasUsers || groups.isFetching)) {
        return false;
    }
    return true;
};

export const fetchGroupsIfNeeded = () => (dispatch, getState) => {
    if (shouldFetchGroups(getState())) {
        return dispatch(getGroups());
    }
};

export const addGroup = (group) => (dispatch, getState) => {
    dispatch({
        type: ADD_GROUP,
        group
    });
    return request.post('/api/groups')
        .send(group)
        .then(dispatch(push('/')));
};
export const updateGroup = (group) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_GROUP,
        group
    });
    return request.post(`/api/groups/${group._id}`)
        .send(group)
        .then(dispatch(push('/')));
};



