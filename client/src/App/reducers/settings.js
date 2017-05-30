import {
    REQUEST_SETTINGS, RECEIVE_SETTINGS, UPDATE_SETTINGS
} from '../actions/settings.js';

const settings = (state = {
    isFetching: false,
    hasSettings: false
}, action) => {
    switch (action.type) {
        case UPDATE_SETTINGS:
            return {
                ...state,
                settings: action.settings
            };
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

export default settings;