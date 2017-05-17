import React from 'react';
import { connect } from 'react-redux';
import CreateEditForm from './CreateEditForm.jsx';
import { fetchUsersIfNeeded } from '../../../actions/users';
import { fetchGroupsIfNeeded } from '../../../actions/groups';
import { addGroup, updateGroup } from '../../../actions/groups';
import Confirm from '../../common/modal/Confirm.jsx';

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
        return (
            <div>
                <CreateEditForm
                    users={this.props.users}
                    identity={this.props.identity}
                    isUpdate={this.props.initialValues ? true : false}
                    initialValues={this.props.initialValues}
                    onSubmit={this.submit}
                />
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