import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import CreateEditForm from './CreateEditForm.jsx';
import { fetchUsersIfNeeded } from '../../../actions/users';
import { fetchGroupsIfNeeded } from '../../../actions/groups';
import { addGroup, updateGroup } from '../../../actions/groups';
import Confirm from '../../common/modal/Confirm.jsx';
import Alert from '../../common/modal/Alert.jsx';

class GroupCreateEditSurface extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchUsersIfNeeded());
        dispatch(fetchGroupsIfNeeded());
    }
    submit(group) {
        const { dispatch, initialValues } = this.props;

        // topics get passed from the form as a single string value, 
        // but must be passed to the server as an array
        group.topics = [group.topics];
        this.refs.confirm.show()
            .then(() => {
                if (initialValues) {
                    group._id = initialValues._id;
                    dispatch(updateGroup(group));
                }
                else {
                    dispatch(addGroup(group));
                }
            })
            .catch(() => { });

    }
    render() {
        const isUpdate = this.props.initialValues ? true : false;
        const group = this.props.initialValues;
        return (
            <div>
                <CreateEditForm
                    users={this.props.users}
                    identity={this.props.identity}
                    isUpdate={isUpdate}
                    initialValues={group}
                    onSubmit={this.submit}
                >
                    <Button onClick={() => {
                        this.refs.emailAddressesAlert.show();
                    }}>Export Email Addresses</Button>
                </CreateEditForm>
                {isUpdate ? (
                    < Alert ref="emailAddressesAlert">
                        <div>
                            <span>Copy and paste this list of email addresses to create an email that can be sent to all the members of our group. </span>
                       <br/>
                       {group.members.map((m, idx) => <span key={idx}>"{m.firstName} {m.lastName}" &lt;{m.email}&gt;, </span>)}
                        </div>
                    </Alert>)
                    : null}    
                <Confirm ref="confirm">
                    <span>Hey! Thanks so much for entering your group's information into the website! <br /><br />

                        Are there any edits you would like to make to ensure your group's description is free of spelling and grammatical errors before you continue?</span>
                </Confirm>
            </div>

        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const groupId = ownProps.match.params.id || '';
    let matchingGroups = [];
    if (state.groups.groups) {
        matchingGroups = state.groups.groups.filter(group => group._id == groupId);
    }

    let initialValues;
    if (matchingGroups.length === 1) {
        initialValues = matchingGroups[0];
    }
    return {
        initialValues,
        users: state.users.users || [],
        identity: state.identity
    };
};
export default connect(mapStateToProps)(GroupCreateEditSurface);