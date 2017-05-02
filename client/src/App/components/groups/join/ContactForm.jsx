import React from 'react';
import InputRow from '../../common/InputRow.jsx';
import { Field } from 'redux-form';
const ContactForm = () => (
    <div>
        <InputRow label="First Name">
            <Field component="input" name="contactFirstName" type="text" placeholder="First Name" required="required" autoComplete="off" className="form-control" />
        </InputRow>

        <InputRow label="Last Name">
            <Field component="input" name="contactLastName" type="text" placeholder="Last Name" required="required" autoComplete="off" className="form-control" />
        </InputRow>

        <InputRow label="Phone">
            <Field component="input" name="contactPhone" type="text" placeholder="Phone" required="required" autoComplete="off" className="form-control" />
        </InputRow>
        <InputRow label="Email">
            <Field component="input" name="contactEmail" type="email" placeholder="Email" required="required" autoComplete="off" className="form-control" />
        </InputRow>
        <InputRow label="Retype Email">
            <Field component="input" name="contactEmailConfirm" type="email" placeholder="Retype Email" required="required" autoComplete="off" className="form-control" />
        </InputRow>
    </div>
);

export default ContactForm;