import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Well, } from 'react-bootstrap';
import InputRow from '../../common/InputRow.jsx';

const JoinForm = (props) => {

    const { handleSubmit } = props;

    return (
        <Well>
            <form name="joinForm" className="form-horizontal" onSubmit={handleSubmit}>

                <InputRow label="First Name">
                    <Field component="input" name="title" type="text" placeholder="Title" required="required" autoComplete="off" className="form-control" />
                </InputRow>

                <InputRow label="Last Name">
                    <Field component="input" name="location" type="text" placeholder="City" required="required" autoComplete="off" className="form-control" />
                </InputRow>

                <InputRow label="Email">
                    <Field component="input" name="childcare" type="checkbox" />
                </InputRow>

                <InputRow label="Retype Email">
                    <Field component="input" name="description" type="textarea" required="required" autoComplete="off" className="form-control" />
                </InputRow>
                <InputRow label="Group Is Disabled">
                    <Field component="input" name="disabled" type="checkbox" />
                </InputRow>

            </form>
        </Well>
    );
};

export default reduxForm({
    form: 'joinForm',  // a unique identifier for this form
})(JoinForm);