import * as request from 'superagent';

export const REQUEST_SETTINGS = 'REQUEST_SETTINGS';
export const RECEIVE_SETTINGS = 'RECEIVE_SETTINGS';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';


export const requestSettings = () => ({
    type: REQUEST_SETTINGS
});

export const receiveSettings = json => ({
    type: RECEIVE_SETTINGS,
    settings: json
});

const fetchSettings = () => dispatch => {
    dispatch(requestSettings());
    return request.get('/api/settings')
        .then(response => dispatch(receiveSettings(response.body)));
};

const shouldFetchSettings = (state) => {
    const settings = state.settings;

    if (settings && (settings.hasSettings || settings.isFetching)) {
        return false;
    }
    return true;
};

export const fetchSettingsIfNeeded = () => (dispatch, getState) => {
    if (shouldFetchSettings(getState())) {
        return dispatch(fetchSettings());
    }
};

export const updateSettings = (key, value) => (dispatch, getState) => {
    let settings = Object.assign({}, getState().settings, { [key]: value });
    dispatch({
        type: UPDATE_SETTINGS,
        settings
    });

    return request.post('/api/settings')
        .send(settings)
        .then(dispatch(fetchSettings()));
};