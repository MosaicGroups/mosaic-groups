import React from 'react';
import InputRow from '../../common/InputRow.jsx';
import { Field } from 'redux-form';
import {
    campuses,
    genders
} from '../../../constants';
import { Col } from 'react-bootstrap';
const MemberForm = ({ namePrefix = '' }) => (
    <div>
        <InputRow label="First Name">
            <Field component="input" name={`${namePrefix}firstName`} type="text" required="required" autoComplete="off" className="form-control" />
        </InputRow>

        <InputRow label="Last Name">
            <Field component="input" name={`${namePrefix}lastName`} type="text" required="required" autoComplete="off" className="form-control" />
        </InputRow>

        <InputRow label="Email">
            <Field component="input" name={`${namePrefix}email`} type="email" required="required" autoComplete="off" className="form-control" />
        </InputRow>

        <InputRow label="Retype Email">
            <Field component="input" name={`${namePrefix}emailConfirmed`} type="email" required="required" autoComplete="off" className="form-control" />
        </InputRow>
        <InputRow label="Gender">
            <Field name={`${namePrefix}gender`} component="select" className="form-control">
                <option></option>
                {genders.map(g => (<option key={g} value={g}>{g}</option>))}
            </Field>
        </InputRow>
        <InputRow label="Campus">
            <Field name={`${namePrefix}campus`} component="select" className="form-control">
                <option></option>
                {campuses.map(g => (<option key={g} value={g}>{g}</option>))}
            </Field>
        </InputRow>
        <InputRow label="Phone Number">
            <Field name={`${namePrefix}phone`} component="input" type="text" required="required" autoComplete="off" className="form-control" />
        </InputRow>
        <InputRow label="Preferred Contact Method">
            <Col md={6}>
                <label className="radio-inline">
                    <Field name={`${namePrefix}preferContactVia`} component="input" type="radio" value="phone" />

                    Phone
                        </label>
            </Col>
            <Col md={6}>
                <label className="radio-inline">
                    <Field name={`${namePrefix}preferContactVia`} component="input" type="radio" value="email" />

                    Email
                        </label>
            </Col>
        </InputRow>
    </div>
);

export default MemberForm;