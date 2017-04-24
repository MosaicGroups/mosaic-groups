import React from 'react';
import { connect } from 'react-redux';
import { fetchUsersIfNeeded } from '../../../actions/users';
import { fetchGroupsIfNeeded } from '../../../actions/groups';
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
    doJoin(member) {
        const { dispatch , group} = this.props;
        dispatch(joinGroup(member, group._id));
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