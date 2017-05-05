// react
import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap';
//boilerplate redux
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

// toastr
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/src/styles/index.scss';

//react router
import { Route } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

//react actions and reducers
import reducer from './reducers';
import { getCurrentUser } from './actions/identity';

//page components
import Header from './components/common/Header.jsx';
import ListSurface from './components/groups/list/ListSurface.jsx';
import JoinSurface from './components/groups/join/JoinSurface.jsx';
import CreateEditSurface from './components/groups/createEdit/CreateEditSurface.jsx';
import UserListSurface from './components/users/ListSurface.jsx';
import LoginSurface from './components/login/LoginSurface.jsx';




const history = createHistory();

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware, routerMiddleware(history))
);

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    // every time the app loads, we want to query the server for a currently logged in user
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getCurrentUser());
    }
    render() {
        return (
            <ConnectedRouter history={history}>
                <div >
                    <Header />

                    <div className="content">
                        <Route exact={true} path="/" component={ListSurface} />
                        <Route path="/login" component={LoginSurface} />
                        <Route exact={true} path="/group/createEdit" component={CreateEditSurface} />
                        <Route path="/group/createEdit/:id" component={CreateEditSurface} />
                        <Route path="/group/join/:id" component={JoinSurface} />
                        <Route path="/user/list" component={UserListSurface} />
                    </div>
                    <ReduxToastr
                        timeOut={3000}
                        newestOnTop={false}
                        preventDuplicates
                        position="bottom-center"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                        progressBar />
                </div>

            </ConnectedRouter>
        );
    }
}
let ConnectedApp = connect()(App);

ReactDOM.render(<Provider store={store}>
    <ConnectedApp />
</Provider>, document.getElementById('root'));
