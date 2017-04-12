import React from 'react';
import SubHeader from './subHeader/SubHeader.jsx';
import { connect } from 'react-redux';
import { fetchSettingsIfNeeded, } from '../../../actions/settings';
import { fetchGroupsIfNeeded, } from '../../../actions/groups';
import 'react-table/react-table.css';
import ReactTable from 'react-table';

const sortedDays = row => {
    switch (row.dayOfTheWeek) {
        case '6-Week Groups':
            return 1;
        case 'Sunday':
            return 2;
        case 'Monday':
            return 3;
        case 'Tuesday':
            return 4;
        case 'Wednesday':
            return 5;
        case 'Thursday':
            return 6;
        case 'Friday':
            return 7;
        case 'Saturday':
            return 8;
        default:
            return 9;    
    }
};

const columns = [
    {
        id: 'dayOTW',
        header: 'Day',
        accessor: sortedDays,
        render: ({ row }) => {
            console.log('TEST Row', row)
            return <span>{row.value}</span>;
        }
    },
    {
        header: 'Title',
        accessor: 'title'
    },
    {
        header: 'Details',
        accessor: 'description'
    },
    {
        header: 'Audience',
        accessor: 'audienceType'
    },
    {
        header: 'Location',
        accessor: 'location'
    },
    {
        header: 'Time',
        accessor: 'meetingTime'
    },
    {
        header: 'Childcare',
        accessor: 'childcare'
    },
    {
        header: 'Topic',
        accessor: 'topic'
    },
    {
        header: 'Actions',
        accessor: 'actions'
    },
];

const Table = ({ groups }) => {
    return (
        <ReactTable
            data={groups}
            columns={columns}
            className='-striped -highlight'
            pivotBy={['dayOTW']}
        />
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