import React from 'react';
import SubHeader from './subHeader/SubHeader.jsx';
import { connect } from 'react-redux';
import { fetchSettingsIfNeeded, } from '../../../actions/settings';
import { fetchGroupsIfNeeded, } from '../../../actions/groups';
import GroupRow from './GroupRow.jsx';

const days = ['6-Week Groups', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const columns = ['Title', 'Details', 'Audience', 'Leader', 'Location', 'Time', 'Childcare', 'Topic', 'Action'];
const Table = ({ groups }) => {
    return (
        <div className="container">
            <table className="table table-condensed table-bordered">
                <thead >
                    <tr >
                        {columns.map(column => (
                            <th className="header" key={column}>
                                {column}
                            </th>
                        ))}

                    </tr>
                </thead>
                {days
                    // remove days for which there are no groups    
                    .filter(day => groups.filter(group => group.dayOfTheWeek === day).length > 0)
                    .map(day => (
                        <tbody key={day}>
                            <tr className="ng-table-group groups-group-row">
                                <td colSpan="9" className="groups-group-cell">
                                    <span className="groups-group-title">
                                        <span className="glyphicon glyphicon-chevron-down">
                                        </span>&nbsp;<span>{day}
                                        </span>
                                    </span>
                                </td>
                            </tr>
                            {groups
                                // now we want all groups for a given day    
                                .filter(group => group.dayOfTheWeek === day)
                                .map(group => {
                                    return (
                                        <GroupRow group={group} key={group._id} />
                                    );
                                })
                            }
                        </tbody>
                    )
                    )}
            </table>
        </div>
    );
};

class GroupListSurface extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { dispatch } = this.props;
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