import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Well } from 'react-bootstrap';
import InputRow from '../../common/InputRow.jsx';
import {
    daysOfTheWeek,
    meetingTimes,
    audienceTypes,
    availableTopics
} from '../../../constants';
import LeaderCheckboxGroup from './LeaderCheckboxGroup.jsx';
import MembersForm from './MembersForm.jsx';

const CreateEditForm = (props) => {

    const { handleSubmit, users, identity, isUpdate, children } = props;

    const spacing = { left: 2, right: 10 };

    return (
        <div className="container">
            <Well>
                <form name="createEditForm" className="form-horizontal" onSubmit={handleSubmit}>
                    <h3>Create/Edit Group</h3>
                    <InputRow {...spacing} label="Title">
                        <Field component="input" name="title" type="text" required="required" autoComplete="off" className="form-control" />
                    </InputRow>
                    <InputRow {...spacing} label="Group Leader(s)">
                        <Field
                            options={users}
                            name="leaders"
                            identity={identity}
                            component={LeaderCheckboxGroup}
                        />
                    </InputRow>
                    <InputRow {...spacing} label="City">
                        <Field component="input" name="location" type="text" required="required" autoComplete="off" className="form-control" />
                    </InputRow>
                    <InputRow {...spacing} label="Day Of The Week">
                        <Field name="dayOfTheWeek" component="select" className="form-control" required>
                            <option></option>
                            {daysOfTheWeek.map(day => (<option key={day} value={day}>{day}</option>))}
                        </Field>
                    </InputRow>
                    <InputRow  {...spacing} label="Time">
                        <Field name="meetingTime" component="select" className="form-control" required>
                            <option></option>
                            {meetingTimes.map(time => (<option key={time} value={time}>{time}</option>))}
                        </Field>
                    </InputRow>
                    <InputRow   {...spacing} label="Member Limit">
                        <Field component="input" name="memberLimit" type="number" min="0" required="required" autoComplete="off" className="form-control" />
                        <small className="help-block">Example: <strong>20</strong></small>
                    </InputRow>
                    <InputRow   {...spacing} label="Audience">
                        <Field name="audienceType" component="select" className="form-control" required>
                            <option></option>
                            {audienceTypes.map(a => (<option key={a} value={a}>{a}</option>))}
                        </Field>
                        <small className="help-block">Select <strong>Group Leaders</strong>  to create a group that is only visible when a group leader is logged in</small>
                    </InputRow>
                    <InputRow   {...spacing} label="Childcare">
                        <Field component="input" name="childcare" type="checkbox" />
                    </InputRow>
                    <InputRow   {...spacing} label="Topic">
                        <Field name="topics" component={props =>
                            <select className={'form-control' + (props.input.value ? '' : ' placeholder')} {...props.input}>
                                <option value="">(Optional)</option>
                                {availableTopics.map(t => (<option key={t} value={t}>{t}</option>))}
                            </select>
                        }/>
                    </InputRow>
                    <InputRow  {...spacing} label="Description">
                        <Field component="textarea" style={{resize:'vertical',height:'100px'}} name="description" type="textarea" required="required" autoComplete="off" className="form-control" />
                    </InputRow>
                    <InputRow   {...spacing} label="Group Is Disabled">
                        <Field component="input" name="disabled" type="checkbox" />
                    </InputRow>
                    <FieldArray name="members" component={MembersForm} />
                    <div className="form-group">
                        <div className="col-md-10 col-md-offset-2">
                            <div className="pull-left">
                                {children}
                            </div>
                            <div className="pull-right">
                                <button className="btn btn-primary">{isUpdate ? 'Update Group' : 'Create Group'}</button>
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
    form: 'createEditFormGroup',  // a unique identifier for this form
})(CreateEditForm);
