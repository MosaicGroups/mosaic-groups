import React from 'react';
import { reduxForm } from 'redux-form';
import { Well } from 'react-bootstrap';
import MemberForm from './MemberForm.jsx';


const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    }
    if (!values.lastName) {
        errors.lastName = 'Required';
    }


    return errors;
};

const JoinForm = (props) => {

    const { handleSubmit } = props;

    return (
        <Well>
            <form name="joinForm" className="form-horizontal" onSubmit={handleSubmit}>
                <MemberForm />
            </form>
        </Well>
    );
};

export default reduxForm({
    form: 'joinForm',  // a unique identifier for this form
    validate
})(JoinForm);