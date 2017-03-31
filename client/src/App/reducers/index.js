import { combineReducers } from 'redux';
import {
    REQUEST_SETTINGS, RECEIVE_SETTINGS
} from '../actions';



const settings = (state = {
    isFetching: false,
    hasSettings:false
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


const rootReducer = combineReducers({
    settings,
});

export default rootReducer;