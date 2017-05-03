import React from 'react';
import { connect } from 'react-redux';
import { authenticate, } from '../../actions/identity';
import CreateEditForm from '../users/createEdit/CreateEditForm.jsx';

import LoginForm from './LoginForm.jsx';
class LoginSurface extends React.Component {
    constructor(props) {
        super(props);
        this.doLogin = this.doLogin.bind(this);
    }
    doLogin({ username, password }) {
        const { dispatch } = this.props;
        dispatch(authenticate(username, password));
    }
    render() {
        return (
            <div>
                <LoginForm onSubmit={this.doLogin} />
                <CreateEditForm labels={{
                    title: 'Register New User',
                    submit: 'Submit'
                }} />
            </div>
        );
    }
}

export default connect()(LoginSurface);