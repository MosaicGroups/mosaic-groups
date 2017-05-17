import React from 'react';
import { connect } from 'react-redux';
import { groupDisabled, groupIsFull, userCanEditGroup } from '../../../utils/index.js';

const ActionLinks = ({ identity, group, settings }) => {
    return (<div>
        {userCanEditGroup(group, identity) ? <a href={`/group/createEdit/${group._id}`}>Edit</a> : null}
        {
            !groupIsFull(group) && !groupDisabled(group, settings) ? <a href={`/group/join/${group._id}`}>Join</a> : (
                (groupDisabled(group, settings) ? <b>Group is Disabled</b> :
                    groupIsFull(group) ? <b>Group is Full</b> : null)
            )
        }
        ({`${group.members.length} of ${group.memberLimit}`})
    </div>);
};

const mapStateToProps = state => {

    return {
        settings: state.settings,
        identity: state.identity
    };
};
export default connect(mapStateToProps)(ActionLinks);