import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { reducer as toastr } from 'react-redux-toastr';
import settings from './settings';
import identity from './identity';
import users from './users';
import groups from './groups';

const rootReducer = combineReducers({
    toastr,
    settings,
    identity,
    users,
    groups,
    form: formReducer,
    router: routerReducer
});

export default rootReducer;