import React from 'react';
import { Field } from 'redux-form';
import {
    campuses,
    genders
} from '../../../constants';

import Confirm from '../../common/modal/Confirm.jsx';
class RemoveUserButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let fields = this.props.fields;
        let memberIndex = this.props.memberIndex;
        return (<div>
            <button onClick={(e) => {
                e.preventDefault();
                this.refs.confirm.show()
                    .then(() => fields.remove(memberIndex))
                    .catch(() => { });
            }} className="btn btn-primary">Remove</button>
            <Confirm ref="confirm">
                <span>Are you sure you want to delete this user from your group?</span>
            </Confirm>
        </div>);
    }
}


const MembersForm = ({ fields, meta: { touched, error, submitFailed } }) => (
    <div className="form-group">
        <label htmlFor="members" className="col-md-2 control-label">Members</label>
        <div className="col-md-10">
            <table name="members" className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Campus</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Prefers</th>
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
                            <td>
                                <Field name={`${member}.gender`} component="select" className="form-control">
                                    <option></option>
                                    {genders.map(g => (<option key={g} value={g}>{g}</option>))}
                                </Field>
                            </td>
                            <td>
                                <Field name={`${member}.campus`} component="select" className="form-control">
                                    <option></option>
                                    {campuses.map(c => (<option key={c} value={c}>{c}</option>))}
                                </Field>
                            </td>
                            <td>
                                <Field
                                    name={`${member}.email`}
                                    component="input"
                                    type="text"
                                    placeholder="Email"
                                    className="form-control" />
                            </td>
                            <td>
                                <Field
                                    name={`${member}.phone`}
                                    type="text"
                                    component="input"
                                    placeholder="Phone"
                                    className="form-control" />
                            </td>
                            <td style={{ width: '150px' }}>
                                <Field name={`${member}.preferContactVia`} required="required" value="PENDING" className="form-control" component="select">
                                    <option value="phone" label="PENDING" >Phone</option>
                                    <option value="email" label="APPROVED">Email</option>
                                </Field>
                            </td>
                            <td style={{ width: '150px' }}>
                                <Field name={`${member}.status`} required="required" value="PENDING" className="form-control" component="select">
                                    <option value="PENDING" label="PENDING" >PENDING</option>
                                    <option value="APPROVED" label="APPROVED">APPROVED</option>
                                </Field>
                            </td>
                            <td>
                                <RemoveUserButton fields={fields} memberIndex={index} />
                            </td>
                        </tr>

                    )}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <button onClick={(e) => {
                                e.preventDefault();
                                fields.push({});
                            }} className="btn btn-default">
                                Add Member
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
);

export default MembersForm;