import * as request from 'superagent';
export const REQUEST_GROUPS = 'REQUEST_GROUPS';
export const RECEIVE_GROUPS = 'RECEIVE_GROUPS';
export const ADD_GROUP = 'ADD_GROUP';

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
    const users = state.users;

    if (users && (users.hasUsers || users.isFetching)) {
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
        type: ADD_GROUP
    });
    return request.post('/api/groups')
        .send(group)
        .then(dispatch(getGroups()));
};


