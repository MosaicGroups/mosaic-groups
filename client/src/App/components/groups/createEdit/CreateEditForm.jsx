import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Well, FormGroup, ControlLabel } from 'react-bootstrap';
import {
    daysOfTheWeek,
    meetingTimes,
    audienceTypes,
    availableTopics
} from '../../../constants';
import LeaderCheckboxGroup from './LeaderCheckboxGroup.jsx';


const renderMembers = ({ fields, meta: { touched, error, submitFailed } }) => (
    <div className="form-group">
        <label htmlFor="members" className="col-md-2 control-label">Members</label>
        <div className="col-md-10">
            <table name="members" className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((member, index) =>
                        <tr key={index}>
                            <td>
                                <Field
                                    name={`${member}.firstName`}
                                    type="text"
                                    component="input"
                                    placeholder="First Name"
                                    className="form-control" />
                            </td>
                            <td>
                                <Field
                                    name={`${member}.lastName`}
                                    type="text"
                                    component="input"
                                    placeholder="Last Name"
                                    className="form-control" />
                            </td>
                            <td><Field
                                name={`${member}.email`}
                                component="input"
                                type="text"
                                placeholder="Email"
                                className="form-control" />
                            </td>
                            <td style={{ width: '150px' }}>
                                <Field name={`${member}.status`} required="required" value="PENDING" className="form-control" component="select">
                                    <option value="PENDING" label="PENDING" >PENDING</option>
                                    <option value="APPROVED" label="APPROVED">APPROVED</option>

                                </Field>
                            </td>
                            <td><button onClick={() => fields.remove(index)} className="btn btn-primary">Remove</button></td>
                        </tr>

                    )}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <button onClick={() => fields.push({})} className="btn btn-default">
                                Add Member
                        </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>


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
    const { handleSubmit, users, identity } = props;

    return (
        <div className="container">
            <Well>
                <form name="createEditForm" className="form-horizontal" onSubmit={handleSubmit}>
                    <h3>Create/Edit Group</h3>
                    <Input label="Title">
                        <Field component="input" name="title" type="text" placeholder="Title" required="required" autoComplete="off" className="form-control" />
                    </Input>
                    <Input label="Group Leader(s)">
                        <Field options={users} name="leaders" identity={identity} component={LeaderCheckboxGroup} />
                    </Input>
                    <Input label="City">
                        <Field component="input" name="location" type="text" placeholder="City" required="required" autoComplete="off" className="form-control" />
                    </Input>
                    <Input label="Day Of The Week">
                        <Field name="dayOfTheWeek" component="select" className="form-control">
                            <option></option>
                            {daysOfTheWeek.map(day => (<option key={day} value={day}>{day}</option>))}
                        </Field>
                    </Input>
                    <Input label="Time">
                        <Field name="meetingTime" component="select" className="form-control">
                            <option></option>
                            {meetingTimes.map(time => (<option key={time} value={time}>{time}</option>))}
                        </Field>
                    </Input>
                    <Input label="Member Limit">
                        <Field component="input" name="memberLimit" type="number" min="0" placeholder="20" required="required" autoComplete="off" className="form-control" />
                    </Input>
                    <Input label="Audience">
                        <Field name="audienceType" component="select" className="form-control">
                            <option></option>
                            {audienceTypes.map(a => (<option key={a} value={a}>{a}</option>))}
                        </Field>
                        <div className="help-block">* select "Group Leaders" to create a group that is only visible when a group leader is logged in</div>
                    </Input>
                    <Input label="Childcare">
                        <Field component="input" name="childcare" type="checkbox" />
                    </Input>
                    <Input label="Topic">
                        <Field name="topic" component="select" className="form-control">
                            <option></option>
                            {availableTopics.map(t => (<option key={t} value={t}>{t}</option>))}
                        </Field>
                    </Input>
                    <Input label="Description">
                        <Field component="input" name="description" type="textarea" required="required" autoComplete="off" className="form-control" />
                    </Input>
                    <Input label="Group Is Disabled">
                        <Field component="input" name="disabled" type="checkbox" />
                    </Input>
                    <FieldArray name="leaders" component={renderMembers} />
                    <div className="form-group">
                        <div className="col-md-10 col-md-offset-2">
                            <div className="pull-right">
                                <button className="btn btn-primary">{null ? 'Update Group' : 'Create Group'}</button>
                                &nbsp;<a href="/" className="btn btn-default">Cancel</a>
                            </div>
                        </div>
                    </div>
                </form>
            </Well>
        </div>
    );
};

export default reduxForm({
    form: 'createEditForm',  // a unique identifier for this form
})(CreateEditForm);