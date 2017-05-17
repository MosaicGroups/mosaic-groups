import React from 'react';
import { connect } from 'react-redux';
import { groupDisabled, groupIsFull, userCanEditGroup } from '../../../utils/index.js';
import {  Row , Col} from 'react-bootstrap';
const ActionLinks = ({ identity, group, settings }) => {
    return (<Row className="text-right">
        {userCanEditGroup(group, identity) ? <Col md={12}><a href={`/group/createEdit/${group._id}`}>Edit</a> </Col>: null}
        {
            !groupIsFull(group) && !groupDisabled(group, settings) ?  <Col md={12}><a href={`/group/join/${group._id}`}>Join</a> </Col>: (
                (groupDisabled(group, settings) ? <Col md={12}> <b>Group is Disabled</b> </Col>:
                    groupIsFull(group) ?  <Col md={12}><b>Group is Full</b> </Col>: null)
            )
        }
         <Col md={12}> {`(${group.members.length} of ${group.memberLimit})`}</Col>
    </Row>);
};

const mapStateToProps = state => {

    return {
        settings: state.settings,
        identity: state.identity
    };
};
export default connect(mapStateToProps)(ActionLinks);