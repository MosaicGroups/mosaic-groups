import React from 'react';
import SubHeader from './subHeader/SubHeader.jsx';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchSettingsIfNeeded, } from '../../../actions/settings';
import { fetchGroupsIfNeeded, } from '../../../actions/groups';
import ListTable from './ListTable.jsx';
import FilterWell from './FilterWell.jsx';
import VideoWell from './VideoWell.jsx';
import InfoWell from './InfoWell.jsx';

class ListSurface extends React.Component {
    constructor(props) {
        super(props);
        this.state = { filteredGroups: this.props.groups.groups };
        this.updateFilter = this.updateFilter.bind(this);
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchSettingsIfNeeded());
        dispatch(fetchGroupsIfNeeded());
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.groups.groups !== nextProps.groups.groups) {
            this.setState({ filteredGroups: nextProps.groups.groups });
        }
    }
    updateFilter(groups) {
        this.setState({ filteredGroups: groups });
    }

    render() {
        let groups = this.state.filteredGroups || {};
        let hasGroups = this.props.groups.hasGroups;
        let settings = this.props.settings || {};
        return (
            <div>
                {settings.hasSettings ? <SubHeader settings={settings} identity={this.props.identity} /> : null}
                <div className="container-fluid">
                    <Row>
                        <Col md={3} >
                            <VideoWell />
                            <FilterWell groups={this.props.groups.groups} updateFilter={this.updateFilter} />
                            <InfoWell />
                        </Col>
                        <Col md={9} >
                            {hasGroups ? <ListTable groups={groups} /> : null}
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
ListSurface.propTypes = {
    dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        settings: state.settings,
        identity: state.identity,
        groups: state.groups
    };
};

export default connect(mapStateToProps)(ListSurface);