import React from 'react';
import SubHeader from './subHeader/SubHeader.jsx';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchSettingsIfNeeded, } from '../../../actions/settings';
import { fetchGroupsIfNeeded, } from '../../../actions/groups';
import ListTable from './ListTable.jsx';
import FilterWell from './FilterWell.jsx';

class ListSurface extends React.Component {
    constructor(props) {
        super(props);
        
        this.updateFilter = this.updateFilter.bind(this);
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchSettingsIfNeeded());
        dispatch(fetchGroupsIfNeeded());
    }
    updateFilter(groups) {
        this.setState({ groups });
    }

    render() {
        let groups = this.props.groups || {};
        let settings = this.props.settings || {};
        return (
            <div>
                {settings.hasSettings ? <SubHeader settings={settings} identity={this.props.identity} /> : null}
                <div className="container-fluid">
                    <Row>
                        <Col md={3} >
                            <FilterWell groups={groups.groups} updateFilter={this.updateFilter} />
                        </Col>
                        <Col md={9} >
                            {groups.hasGroups ? <ListTable groups={groups.groups} /> : null}
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