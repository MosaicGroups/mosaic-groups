import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {
    REQUEST_SETTINGS, RECEIVE_SETTINGS
} from '../actions/settings.js';

import {
    REQUEST_AUTHENTICATION, RECEIVE_AUTHENTICATION
} from '../actions/identity';

const settings = (state = {
    isFetching: false,
    hasSettings: false
}, action) => {
    switch (action.type) {
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


const rootReducer = combineReducers({
    settings,
    identity,
    form: formReducer
});

export default rootReducer;