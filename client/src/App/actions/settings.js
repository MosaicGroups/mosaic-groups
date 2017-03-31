export const REQUEST_SETTINGS = 'REQUEST_SETTINGS';
export const RECEIVE_SETTINGS = 'RECEIVE_SETTINGS';


export const requestSettings = () => ({
    type: REQUEST_SETTINGS
});

export const receiveSettings = json => ({
    type: RECEIVE_SETTINGS,
    settings: json
});

const fetchSettings = () => dispatch => {
    dispatch(requestSettings());
    return fetch('/api/settings')
        .then(response => response.json())
        .then(json => dispatch(receiveSettings(json)));
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