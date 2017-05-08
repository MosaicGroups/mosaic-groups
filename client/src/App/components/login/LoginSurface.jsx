import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../../actions/identity';
import { addUser } from '../../actions/users';
import CreateEditForm from '../users/createEdit/CreateEditForm.jsx';

import LoginForm from './LoginForm.jsx';
class LoginSurface extends React.Component {
    constructor(props) {
        super(props);
        this.doLogin = this.doLogin.bind(this);
        this.doRegister = this.doRegister.bind(this);
    }
    doLogin({ username, password }) {
        const { dispatch } = this.props;
        dispatch(authenticate(username, password));
    }
    doRegister(newUser) {
        const { dispatch } = this.props;
        dispatch(addUser(newUser));
    }
    render() {
        return (
            <div>
                <LoginForm onSubmit={this.doLogin} />
                <CreateEditForm
                    labels={{
                        title: 'Register New User',
                        submit: 'Submit'
                    }}
                    onSubmit={this.doRegister}
                />
            </div>
        );
    }
}

export default connect()(LoginSurface);