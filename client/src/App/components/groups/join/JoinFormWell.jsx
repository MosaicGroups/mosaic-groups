import React from 'react';
import { reduxForm } from 'redux-form';
import { Well, FormGroup, Col, Button } from 'react-bootstrap';
import MemberForm from './MemberForm.jsx';
import { groupDisabled, groupIsFull } from '../../../utils/index.js';

const spousePrefix = 'spouse';

const validateEmail = email => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const validate = (values, props) => {
    const errors = {};

    //basic required fields
    let requiredFields = [
        'firstName',
        'lastName',
        'email',
        'emailConfirmed',
        'gender',
        'campus',
        'phone',
        'preferContactVia'
    ];

    requiredFields.map(f => {

        if (!values[f]) {
            errors[f] = 'Required';
        }
    });
    if (!validateEmail(values.email)) {
        errors.email = 'Email address must be valid';
    }
    if (!(values.email === values.emailConfirmed)) {
        errors.email = 'Email addresses must match';
    }
    //coupls groups have to be handled differently
    if (props.group.audienceType === 'Couples') {
        if (values.spouse) {
            requiredFields.map(f => {

                if (!values.spouse[f]) {
                    errors[f] = 'Required';
                }
            });

            if (!validateEmail(values.spouse.email)) {
                errors.email = 'Email address must be valid';
            }
            if (!(values.spouse.email === values.spouse.emailConfirmed)) {
                errors.email = 'Email addresses must match';
            }
        }
        else {
            errors.firstName = 'Required';
        }
    }
    console.log('requiredFields', requiredFields);
    console.log('values', values);



    console.log('errors', errors);

    return errors;
};

const JoinForm = (props) => {

    const { handleSubmit, pristine, submitting, invalid, group, settings } = props;

    return (
        <Well>
            <form name="joinForm" className="form-horizontal" onSubmit={handleSubmit}>
                <MemberForm />
                {group.audienceType === 'Couples' ? (
                    <div>
                        <h3>Spouse Info: </h3>
                        <MemberForm namePrefix={spousePrefix + '.'} />
                    </div>
                ) : null}
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