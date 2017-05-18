import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Well } from 'react-bootstrap';
import InputRow from '../../common/InputRow.jsx';
import RolesCheckboxes from './RolesCheckboxes.jsx';
const validate = (values, props) => {
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
    if (!props.isUpdate && !values.password) {
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
    const { handleSubmit, pristine, submitting, invalid, labels, allowRoleFields = false, identity = {} } = props;
    // let identityRoles = identity.roles || [];
    const spacing = { left: 2, right: 10 };

    const displayRoleFields = () => {
        if (allowRoleFields) {
            return (
                <Field
                    name="roles"
                    identity={identity}
                    spacing={spacing}
                    component={RolesCheckboxes}
                />
            );
        }
        else {
            return null;
        }
    };
    return (
        <div className="container" style={createEditFormStyle}>
            <Well>
                <form name="createEditForm" className="form-horizontal" onSubmit={handleSubmit}>
                    <legend>{labels.title}</legend>
                    <InputRow {...spacing} label="Username (Email)">
                        <Field component="input" name="username" type="email" required="required" autoComplete="off" className="form-control" />
                    </InputRow>
                    <InputRow {...spacing} label="First Name">
                        <Field component="input" name="firstName" type="text" required="required" autoComplete="off" className="form-control" />
                    </InputRow>
                    <InputRow {...spacing} label="Last Name">
                        <Field component="input" name="lastName" type="text" required="required" autoComplete="off" className="form-control" />
                    </InputRow>
                    <InputRow {...spacing} label="Password">
                        <Field component="input" name="password" type="password" autoComplete="off" className="form-control" />
                    </InputRow>

                    {displayRoleFields()}

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