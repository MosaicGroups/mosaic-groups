import * as request from 'superagent';

export const REQUEST_AUTHENTICATION = 'REQUEST_AUTHENTICATION';
export const RECEIVE_AUTHENTICATION = 'RECEIVE_AUTHENTICATION';


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
        .then(response => dispatch(receiveAuthentication(response)));
};

