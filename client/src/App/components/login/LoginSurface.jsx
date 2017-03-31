import React from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm.jsx';
class LoginSurface extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<LoginForm />);
    }
}

export default connect()(LoginSurface);