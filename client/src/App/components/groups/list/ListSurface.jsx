import React from 'react';
import SubHeader from './subHeader/SubHeader.jsx';
import { connect } from 'react-redux';
import { fetchSettingsIfNeeded, } from '../../../actions/settings';
import { fetchGroupsIfNeeded, } from '../../../actions/groups';
import { OverlayTrigger, Popover } from 'react-bootstrap';
const Table = ({ groups }) => {
    return (
        <div className="container">
            <table className="table table-condensed table-bordered">
                <thead >
                    <tr >
                        <th className="header ">
                            Title
      </th>
                        <th className="header ">
                            Details
      </th>
                        <th className="header ">Audience
      </th>
                        <th className="header ">
                            Leader
      </th>
                        <th className="header ">
                            Location
      </th>
                        <th className="header ">
                            Time
      </th>
                        <th className="header ">Childcare
      </th>
                        <th className="header ">
                            Topic
      </th>
                        <th className="header ">Action
      </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        groups.map(group => {
                            return (
                                <tr key={group._id}>
                                    <td>
                                        {group.title}
                                    </td>
                                    <td>
                                        <OverlayTrigger  placement="right" overlay={(
                                            <Popover id={group._id} >
                                                {group.description}
                                            </Popover>
                                        )}>
                                            <a href="" >Details...</a>
                                         </OverlayTrigger>
                                    </td>
                                        <td>
                                            {group.audienceType}
                                        </td>
                                        <td>
                                            leaders
                                    </td>
                                        <td>
                                            {group.location}
                                        </td>
                                        <td>
                                            {group.meetingTime}
                                        </td>
                                        <td>
                                            {group.childcare}
                                        </td>
                                        <td>
                                            topics
                                    </td>
                                        <td>
                                            actions
                                    </td>
                                </tr>
                                    );
                        })
                    }
                </tbody>
            </table>
        </div>
                );
};

class GroupListSurface extends React.Component {
                    constructor(props) {
                super(props);
    }
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchSettingsIfNeeded());
        dispatch(fetchGroupsIfNeeded());
    }

    render() {
                    let groups = this.props.groups || {};
        let settings = this.props.settings || {};
        return (
            <div>
                    {settings.hasSettings ? <SubHeader settings={settings} identity={this.props.identity} /> : null}
                    {groups.hasGroups ? <Table groups={groups.groups} identity={this.props.identity} /> : null}
                </div>
                );
    }
}
GroupListSurface.propTypes = {
                    dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
                    settings: state.settings,
        identity: state.identity,
        groups: state.groups
    };
};

export default connect(mapStateToProps)(GroupListSurface);