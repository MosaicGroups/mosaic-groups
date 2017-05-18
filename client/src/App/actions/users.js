import * as request from 'superagent';
import { toastr } from 'react-redux-toastr';
import { push } from 'react-router-redux';
import { updateAuthUser } from './identity';

export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

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

export const addUser = (newUser) => (dispatch, getState) => {
    //initialize the group members array

    dispatch({
        type: ADD_USER,
        user: newUser
    });
    return request.post('/api/users')
        .send(newUser)
        .then(() => {
            toastr.success('Success', `You have successfully added ${newUser.firstName} ${newUser.lastName}`);
            dispatch(push('/'));
        })
        .catch(err => {
            toastr.error('Error', `There was an error adding ${newUser.firstName} ${newUser.lastName}`);
        });
};
export const updateUser = (user) => (dispatch, getState) => {
    if (getState().identity._id && getState().identity._id === user._id) {
        dispatch(updateAuthUser(user));
    }
    dispatch({
        type: UPDATE_USER,
        user
    });
    return request.post(`/api/users/${user._id}`)
        .send(user)
        .then(response => {
            toastr.success('Success', `You have successfully updated ${user.firstName} ${user.lastName}`);
            dispatch(push('/'));
        })
        .catch(err => {
            toastr.error('Error', `There was an error updating ${user.firstName} ${user.lastName}`);
        });
};

export const deleteUser = (user) => (dispatch, getState) => {
    dispatch({
        type: DELETE_USER,
        user: user
    });
    return request.delete(`/api/users/${user._id}`)
        .then(response => {
            toastr.success('Success', `${user.firstName} ${user.lastName} has been deleted`);
        })
        .catch(err => {
            toastr.error('Error', `There was an error deleting ${user.firstName} ${user.lastName}`);
        });
};


export const fetchUsersIfNeeded = () => (dispatch, getState) => {
    if (shouldFetchUsers(getState())) {
        return dispatch(listUsers());
    }
};


