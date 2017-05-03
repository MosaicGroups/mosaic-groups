import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Well } from 'react-bootstrap';
import InputRow from '../../common/InputRow.jsx';

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required';
    }
    if (!values.firstName) {
        errors.firstName = 'Required';
    }
    if (!values.lastName) {
        errors.lastName = 'Required';
    }
    if (!values.password) {
        errors.password = 'Required';
    }


    return errors;
};

const createEditFormStyle = {
    paddingTop: '30px'
};

const buttonStyle = {
    marginRight: '10px'
};

const CreateEditForm = (props) => {
    const { handleSubmit, pristine, submitting, invalid, labels } = props;
    const spacing = { left: 2, right: 10 };
    return (
        <div className="container" style={createEditFormStyle}>
            <Well>
                <form name="createEditForm" className="form-horizontal" onSubmit={handleSubmit}>
                    <legend>{labels.title}</legend>
                    <InputRow {...spacing} label="Username (Email)">
                        <Field component="input" name="username" type="email" placeholder="Username (Email)" required="required" autoComplete="off" className="form-control" />
                    </InputRow>
                    <InputRow {...spacing} label="First Name">
                        <Field component="input" name="firstName" type="text" placeholder="First Name" required="required" autoComplete="off" className="form-control" />
                    </InputRow>
                    <InputRow {...spacing} label="Last Name">
                        <Field component="input" name="lastName" type="text" placeholder="Last Name" required="required" autoComplete="off" className="form-control" />
                    </InputRow>
                    <InputRow {...spacing} label="Password">
                        <Field component="input" name="password" type="password" placeholder="Password" required="required" autoComplete="off" className="form-control" />
                    </InputRow>
                    <div className="form-group">
                        <div className="col-md-10 col-md-offset-2">
                            <div className="pull-right">
                                <button type="submit" disabled={pristine || invalid || submitting} className="btn btn-primary" style={buttonStyle}>{labels.submit}</button>
                                <a href="/" className="btn btn-default">Cancel</a>
                            </div>
                        </div>
                    </div>
                </form>
            </Well>
        </div>
    );
};
export default reduxForm({
    form: 'createEditFormUser',  // a unique identifier for this form
    validate
})(CreateEditForm);