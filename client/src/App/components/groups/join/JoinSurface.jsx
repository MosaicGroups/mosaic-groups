import React from 'react';
import { connect } from 'react-redux';
import { fetchUsersIfNeeded } from '../../../actions/users';
import { fetchGroupsIfNeeded } from '../../../actions/groups';

class JoinSurface extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchUsersIfNeeded());
        dispatch(fetchGroupsIfNeeded());
    }
    render() {
        let { group } = this.props;

        return (<span>Joining {group.title || 'group is invalide'}</span>);
    }
}
const mapStateToProps = (state, ownProps) => {
    const groupId = ownProps.match.params.id || '';

    let matchingGroups = [];
    if (state.groups.groups) {
        matchingGroups = state.groups.groups.filter(group => group._id == groupId);
    }


    let group;
    if (matchingGroups.length === 1) {
        group = matchingGroups[0];
    }
    else {
        group = {};
    }
    return {
        group,
        users: state.users.users || [],
        identity: state.identity
    };
};
export default connect(mapStateToProps)(JoinSurface);