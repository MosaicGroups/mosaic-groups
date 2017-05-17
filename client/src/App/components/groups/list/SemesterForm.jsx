import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Col, Button } from 'react-bootstrap';

const SemesterForm = ({ handleSubmit, pristine, submitting }) => {

    const semesterStyle = {
        'marginBottom': '10px',
        'width': '80%'
    };

    return (
        <form onSubmit={handleSubmit} className="form-horizontal">
            <Col md={12}>
                <Field
                    name="semesterName"
                    component="input"
                    type="text"
                    placeholder="New Semester Name"
                    className="form-control"
                    style={semesterStyle}
                />
            </Col>
            <Col md={12}>
                <Button type="submit" disabled={pristine || submitting}>
                    Start New Semester
                </Button>
            </Col>
        </form>
    );
};

export default reduxForm({
    form: 'newSemesterForm',
})(SemesterForm);