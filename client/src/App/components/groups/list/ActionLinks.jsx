import React from 'react';
import { connect } from 'react-redux';
import { groupDisabled, groupIsFull, userCanEditGroup } from '../../../utils/index.js';
import { Row, Col } from 'react-bootstrap';
import{deleteGroup} from '../../../actions/groups'

import Confirm from '../../common/modal/Confirm.jsx';
class DeleteLink extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { dispatch } = this.props;
        return (<div>
            <a href onClick={(e) => {
                e.preventDefault();
                this.refs.confirm.show()
                    .then(() => dispatch(deleteGroup(this.props.group)))
                    .catch(() => { });
            }} >Delete</a>
            <Confirm ref="confirm">
                <span>Are you sure you want to delete the group: {this.props.group.title}?</span>
            </Confirm>
        </div>);
    }
}
const ConnDeleteLink = connect()(DeleteLink);
const ActionLinks = ({ identity, group, settings }) => {
    return (
        <Row className="text-right">
            {
                !groupIsFull(group) && !groupDisabled(group, settings) ? <Col md={12}><a href={`/group/join/${group._id}`}>Join</a> </Col> : (
                    (groupDisabled(group, settings) ? <Col md={12}> <b>Group is Disabled</b> </Col> :
                        groupIsFull(group) ? <Col md={12}><b>Group is Full</b> </Col> : null)
                )
            }
            {userCanEditGroup(group, identity) ? <Col md={12}><a href={`/group/createEdit/${group._id}`}>Manage</a> </Col> : null}
            {identity.roles&&identity.roles.includes('admin') ? (<Col md={12}><ConnDeleteLink group={group}/> </Col>) : null}
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