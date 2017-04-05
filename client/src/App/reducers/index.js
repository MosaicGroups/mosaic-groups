import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import {
    REQUEST_SETTINGS, RECEIVE_SETTINGS, UPDATE_SETTINGS
} from '../actions/settings.js';

import {
    REQUEST_AUTHENTICATION, RECEIVE_AUTHENTICATION
} from '../actions/identity';
import {
    REQUEST_USERS, RECEIVE_USERS
} from '../actions/users';

const settings = (state = {
    isFetching: false,
    hasSettings: false
}, action) => {
    switch (action.type) {
        case UPDATE_SETTINGS:
            return state;
        case REQUEST_SETTINGS:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_SETTINGS:
            return Object.assign({}, state, {
                isFetching: false,
                hasSettings: true
            }, action.settings);

        default:
            return state;
    }
};

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


const rootReducer = combineReducers({
    settings,
    identity,
    users,
    form: formReducer,
    router: routerReducer
});

export default rootReducer;