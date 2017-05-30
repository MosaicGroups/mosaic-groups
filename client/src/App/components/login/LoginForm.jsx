import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Well } from 'react-bootstrap';
import InputRow from '../common/InputRow.jsx';

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required';
    }
    if (!values.password) {
        errors.password = 'Required';
    }


    return errors;
};

const loginContainerStyle = {
    paddingTop: '30px'
};

const loginButtonStyle = {
    marginRight: '10px'
};
const spacing = {
    left: 2,
    right: 10
};

const LoginForm = (props) => {
    const { handleSubmit, pristine, submitting, invalid } = props;
    return (
        <div className="container" style={loginContainerStyle}>
            <Well>
                <form name="loginForm" className="form-horizontal" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Log In</legend>
                        <InputRow {...spacing} label="Username (Email)">
                            <Field component="input" name="username" type="email" required="required" autoComplete="off" className="form-control " />
                        </InputRow>
                        <InputRow {...spacing} label="Password">
                            <Field component="input" name="password" type="password" required="required" autoComplete="off" className="form-control " />
                        </InputRow>
                        <div className="form-group">
                            <div className="col-md-10 col-md-offset-2">
                                <div className="pull-right">
                                    <button type="submit" disabled={pristine || invalid || submitting} className="btn btn-primary" style={loginButtonStyle}>Log In</button>
                                    <a href="/" className="btn btn-default">Cancel</a>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </Well>
        </div>
    );
};
export default reduxForm({
    form: 'login',  // a unique identifier for this form
    validate
})(LoginForm);