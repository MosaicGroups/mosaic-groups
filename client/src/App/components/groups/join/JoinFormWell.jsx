import React from 'react';
import { reduxForm } from 'redux-form';
import { Well, FormGroup, Col, Button } from 'react-bootstrap';
import MemberForm from './MemberForm.jsx';
import ContactForm from './ContactForm.jsx';
import { groupDisabled, groupIsFull } from '../../../utils/index.js';
import { couplesGroups } from '../../../constants/index.js';
import joinFormValidation from './joinFormValidation';

const spousePrefix = 'spouse';


const JoinForm = (props) => {

    const { handleSubmit, pristine, submitting, invalid, group, settings } = props;

    return (
        <Well>
            <form name="joinForm" className="form-horizontal" onSubmit={handleSubmit}>
                <MemberForm />
                {couplesGroups.includes(group.audienceType) ? (
                    <div>
                        <h3>Spouse Info: </h3>
                        <MemberForm namePrefix={spousePrefix + '.'} />
                    </div>
                ) : null}
                {(group.audienceType === 'Middle School Students' || group.audienceType === 'High School Students') ? (
                   <div>
                        <h3>Emergency Contact:</h3>
                        <ContactForm />
                    </div>    
                ):null}
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
    validate: joinFormValidation
})(JoinForm);