import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import identity from './identity';
import users from './users';
import groups from './groups';

const rootReducer = combineReducers({
    settings,
    identity,
    users,
    groups,
    form: formReducer,
    router: routerReducer
});

export default rootReducer;