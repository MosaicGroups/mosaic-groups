import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Well, FormGroup, ControlLabel } from 'react-bootstrap';

const Input = ({ label, children }) => {
    return (
        <FormGroup>
            <ControlLabel className="col-md-2 control-label">{label}</ControlLabel>
            <div className="col-md-10">
                {children}
            </div>
        </FormGroup>
    );
};

const CreateEditForm = (props) => {
    const { handleSubmit, pristine, submitting, invalid, users } = props;
    return (
        <div className="container">
            <Well>
                <form name="createEditForm" className="form-horizontal" onSubmit={handleSubmit}>
                    <h3>Create/Edit Group</h3>
                    <Input label="Title">
                        <Field component="input" name="title" type="text" placeholder="Title" required="required" autoComplete="off" className="form-control " />
                    </Input>
                    <Input label="Group Leader(s)">
                        <FieldArray name="leaders" component={() => (
                            <div>
                                {users.map(u => (
                                    <label key={u._id}>
                                        <Field name={`leader[${u._id}]`} component="input" type="checkbox" value={u._id} />{`${u.firstName} ${u.lastName}`}
                                    </label>
                                ))}
                            </div>
                        )} />


                    </Input>
                </form>
            </Well>
        </div>
    );
};

export default reduxForm({
    form: 'createEditForm',  // a unique identifier for this form
})(CreateEditForm);