import React from 'react';
import InputRow from '../../common/InputRow.jsx';
import { Field } from 'redux-form';
const ContactForm = () => (
    <div>
        <InputRow label="First Name">
            <Field component="input" name="contactFirstName" type="text" required="required" autoComplete="off" className="form-control" />
        </InputRow>

        <InputRow label="Last Name">
            <Field component="input" name="contactLastName" type="text" required="required" autoComplete="off" className="form-control" />
        </InputRow>

        <InputRow label="Phone">
            <Field component="input" name="contactPhone" type="text" required="required" autoComplete="off" className="form-control" />
        </InputRow>
        <InputRow label="Email">
            <Field component="input" name="contactEmail" type="email" required="required" autoComplete="off" className="form-control" />
        </InputRow>
        <InputRow label="Retype Email">
            <Field component="input" name="contactEmailConfirm" type="email" required="required" autoComplete="off" className="form-control" />
        </InputRow>
    </div>
);

export default ContactForm;