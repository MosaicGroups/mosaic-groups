import * as request from 'superagent';
export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';


export const requestUsers = () => ({
    type: REQUEST_USERS
});

export const receiveUsers = response => ({
    type: RECEIVE_USERS,
    users: response.body
});

const listUsers = () => dispatch => {
    dispatch(requestUsers());
    return request.get('/api/users')
        .then(response => {
            return dispatch(receiveUsers(response));
        });
};
const shouldFetchUsers = (state) => {
    const users = state.users;

    if (users && (users.hasUsers || users.isFetching)) {
        return false;
    }
    return true;
};


export const fetchUsersIfNeeded = () => (dispatch, getState) => {
    if (shouldFetchUsers(getState())) {
        return dispatch(listUsers());
    }
};


