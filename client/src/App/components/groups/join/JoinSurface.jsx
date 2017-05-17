import React from 'react';
import { connect } from 'react-redux';
import { fetchUsersIfNeeded } from '../../../actions/users';
import { fetchGroupsIfNeeded } from '../../../actions/groups';
import { couplesGroups } from '../../../constants/index.js';
import { Jumbotron, Row, Col } from 'react-bootstrap';
import DescriptionWell from './DescriptionWell.jsx';
import JoinFormWell from './JoinFormWell.jsx';
import { joinGroup, } from '../../../actions/groups';


class JoinSurface extends React.Component {
    constructor(props) {
        super(props);
        this.doJoin = this.doJoin.bind(this);
    }
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchUsersIfNeeded());
        dispatch(fetchGroupsIfNeeded());
    }
    doJoin(memberForm) {
        const { dispatch, group } = this.props;
        if (couplesGroups.includes(group.audienceType)) {
            // if the audience type is Couples, then we've got to split the form into two objects   
            let spouse = memberForm.spouse;
            delete memberForm.spouse;
            let member = memberForm;

            dispatch(joinGroup({ member, spouse }, group._id));
        }
        else if (group.audienceType === 'Middle School Students' || group.audienceType === 'High School Students') {
            let member = memberForm;
            member.emergency_contact = {
                email: member.contactEmail,
                firstName: member.contactFirstName,
                lastName: member.contactLastName,
                phone: member.contactPhone
            };

            delete member.contactEmail;
            delete member.contactFirstName;
            delete member.contactLastName;
            delete member.contactPhone;
            dispatch(joinGroup({ member }, group._id));
        }
        else {
            dispatch(joinGroup({ member: memberForm }, group._id));
        }
    }
    render() {
        let { group, settings } = this.props;
        if (group.title) {
            return (
                <div className="container">
                    <Jumbotron>
                        <h1>{group.title}</h1>
                    </Jumbotron>
                    <Row>
                        <Col md={6}>
                            <DescriptionWell group={group} />
                        </Col>
                        <Col md={6}>
                            <JoinFormWell onSubmit={this.doJoin} group={group} settings={settings} />
                        </Col>
                    </Row>
                </div>
            );
        }
        else {
            return <span>loading...</span>;
        }

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
        settings: state.settings,
        group
    };
};
export default connect(mapStateToProps)(JoinSurface);