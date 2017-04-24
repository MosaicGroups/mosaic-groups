import React from 'react';
import { reduxForm } from 'redux-form';
import { Well, FormGroup, Col, Button } from 'react-bootstrap';
import MemberForm from './MemberForm.jsx';
import { groupDisabled, groupIsFull } from '../../../utils/index.js';


const validateEmail = email => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const validate = values => {
    console.log('values', values);
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    }
    if (!values.lastName) {
        errors.lastName = 'Required';
    }
    if (!values.email || !values.emailConfirmed) {
        errors.email = 'Required';
    }
    if (!validateEmail(values.email)) {
        errors.email = 'Email address must be valid';
    }
    if (!(values.email === values.emailConfirmed)) {
        errors.email = 'Email addresses must match';
    }
    if (!values.gender) {
        errors.gender = 'Required';
    }

    if (!values.campus) {
        errors.campus = 'Required';
    }
    if (!values.phone) {
        errors.phone = 'Required';
    }

    if (!values.preferContactVia) {
        errors.preferContactVia = 'Required';
    }

    return errors;
};

const JoinForm = (props) => {

    const { handleSubmit, pristine, submitting, invalid, group, settings } = props;

    return (
        <Well>
            <form name="joinForm" className="form-horizontal" onSubmit={handleSubmit}>
                <MemberForm />
                <FormGroup>
                    <Col md={10} mdOffset={2} className="pull-right">
                        <Button type="submit" className="btn-primary" disabled={pristine || invalid || submitting || groupIsFull(group) || groupDisabled(group, settings)}>
                            {groupIsFull(group) ? 'Group Is Full' : 'Join'}
                        </Button>
                        &nbsp;
                        <a href="/" className="btn btn-default">
                            Cancel
                        </a>
                    </Col>

                </FormGroup>
            </form>
        </Well>
    );
};

export default reduxForm({
    form: 'joinForm',  // a unique identifier for this form
    validate
})(JoinForm);