import * as request from 'superagent';
import { push } from 'react-router-redux';
export const REQUEST_AUTHENTICATION = 'REQUEST_AUTHENTICATION';
export const RECEIVE_AUTHENTICATION = 'RECEIVE_AUTHENTICATION';

import { toastr } from 'react-redux-toastr';
export const requestAuthentication = () => ({
    type: REQUEST_AUTHENTICATION
});

export const receiveAuthentication = response => ({
    type: RECEIVE_AUTHENTICATION,
    user: response.body.user
});

export const authenticate = (username, password) => dispatch => {
    dispatch(requestAuthentication());
    return request.post('/login')
        .send({ username, password })
        .then(response => {
            if (response.body.success) {
                return response;
            }
            else {
                return Promise.reject('We could not log you in');
            }
        })
        .then(response => {
            toastr.success('Success', 'You have logged in');
            dispatch(push('/'));
            return dispatch(receiveAuthentication(response));
        })
        .catch(err => {
            toastr.error('Error', 'We could not log you in at this time');
        });
};

export const getCurrentUser = (username, password) => dispatch => {
    dispatch(requestAuthentication());
    return request.get('/api/user')
        .then(response => {
            return dispatch(receiveAuthentication(response));
        });
};



