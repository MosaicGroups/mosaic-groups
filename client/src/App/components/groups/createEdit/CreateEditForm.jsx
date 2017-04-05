import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Well, FormGroup, ControlLabel } from 'react-bootstrap';

const CheckboxGroup = ({ label, required, name, options, input, meta }) => (
    <FormGroup controlId={name}>
        {options.map((option, index) => (
            <div className="checkbox" key={index}>
                <label>
                    <input type="checkbox"
                        name={`${name}[${index}]`}
                        value={option._id}
                        checked={input.value.indexOf(option._id) !== -1}
                        onChange={event => {
                            const newValue = [...input.value];
                            if (event.target.checked) {
                                newValue.push(option._id);
                            } else {
                                newValue.splice(newValue.indexOf(option._id), 1);
                            }

                            return input.onChange(newValue);
                        }} />
                    {`${option.firstName} ${option.lastName}`} 
                </label>
            </div>))
        }
    </FormGroup>
);

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
    const { handleSubmit,  users } = props;
    return (
        <div className="container">
            <Well>
                <form name="createEditForm" className="form-horizontal" onSubmit={handleSubmit}>
                    <h3>Create/Edit Group</h3>
                    <Input label="Title">
                        <Field component="input" name="title" type="text" placeholder="Title" required="required" autoComplete="off" className="form-control " />
                    </Input>
                    <Input label="Group Leader(s)">
                        <Field options={users} name="leaders" component={CheckboxGroup} />


                    </Input>
                </form>
            </Well>
        </div>
    );
};

export default reduxForm({
    form: 'createEditForm',  // a unique identifier for this form
})(CreateEditForm);