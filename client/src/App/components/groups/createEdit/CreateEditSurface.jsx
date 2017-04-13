import React from 'react';
import { connect } from 'react-redux';
import CreateEditForm from './CreateEditForm.jsx';
import { fetchUsersIfNeeded } from '../../../actions/users';
import { fetchGroupsIfNeeded } from '../../../actions/groups';
import { addGroup, updateGroup } from '../../../actions/groups';

class CreateEditSurface extends React.Component {
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
        if (initialValues) {
            group._id = initialValues._id;
            dispatch(updateGroup(group));
        }
        else {
            dispatch(addGroup(group));
        }
    }
    render() {
        return (
            <CreateEditForm
                users={this.props.users}
                identity={this.props.identity}
                isUpdate={this.props.initialValues ? true : false}
                initialValues={this.props.initialValues}
                onSubmit={this.submit}
            />
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const groupId = ownProps.match.params.id || '';
    let matchingGroups = [];
    if (state.groups.groups) {
        matchingGroups = state.groups.groups.filter(group => group._id == groupId);
    }
    return {
        initialValues: (matchingGroups.length === 1 ? matchingGroups[0] : null),
        users: state.users.users || [],
        identity: state.identity
    };
};
export default connect(mapStateToProps)(CreateEditSurface);