import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import { getCurrentUser } from './actions/identity';
import Header from './components/common/Header.jsx';
import GroupListSurface from './components/groups/list/GroupListSurface.jsx';
import LoginSurface from './components/login/LoginSurface.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
);

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getCurrentUser());
    }
    render() {
        return (
            <Router history={Router.hashHistory}>
                <div >
                    <Header />

                    <div className="content">
                        <Route exact={true} path="/" component={GroupListSurface} />

                        <Route path="/login" component={LoginSurface} />
                        {/*  
      <Route path="/profile" component="" />
      <Route path="/group-create-or-edit" component="" />
      <Route path="/group-create-or-edit/:id" component="" />
      <Route path="/user-edit/:id" component="" />
      <Route path="/user-list" component="" />
      <Route path="/user-create" component="" />
      <Route path="/group-list" component="" />
      <Route path="/group-join/:id" component="" />
      <Route path="/group-full/:id" component="" />*/}
                    </div>
                </div>
            </Router>
        );
    }
}
let ReduxApp = connect()(App);

ReactDOM.render(<Provider store={store}><ReduxApp /></Provider>, document.getElementById('root'));
