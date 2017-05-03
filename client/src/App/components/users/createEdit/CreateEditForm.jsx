import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Well } from 'react-bootstrap';
import InputRow from '../../common/InputRow.jsx';


const RolesCheckboxes = (props) => {

    let { name, input, spacing = {}, identity = {} } = props;

    let identityRoles = identity.roles || [];

    return (
        <div>
            {identityRoles.includes('admin') || identityRoles.includes('superadmin') ? (
                <InputRow {...spacing} label="Admin">
                    <input
                        type="checkbox"
                        name={`${name}[0]`}
                        value={'admin'}
                        checked={input.value.includes('admin')}
                        onChange={event => {

                            const newValue = [...input.value];
                            if (event.target.checked) {
                                newValue.push('admin');
                            } else {
                                newValue.splice(newValue.indexOf('admin'), 1);
                            }

                            return input.onChange(newValue);
                        }} />
                </InputRow>
            ) : null}
            {identityRoles.includes('superadmin') ? (
                <InputRow {...spacing} label="Super Admin">
                    <input
                        type="checkbox"
                        name={`${name}[1]`}
                        value={'superadmin'}
                        checked={input.value.includes('superadmin')}
                        onChange={event => {

                            const newValue = [...input.value];
                            if (event.target.checked) {
                                newValue.push('superadmin');
                            } else {
                                newValue.splice(newValue.indexOf('superadmin'), 1);
                            }

                            return input.onChange(newValue);
                        }} />


                </InputRow>
            ) : null}

        </div>
    );
};


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