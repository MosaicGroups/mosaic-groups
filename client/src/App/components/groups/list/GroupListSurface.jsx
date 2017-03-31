import React from 'react';
import SubHeader from './subHeader/SubHeader.jsx';
import { connect } from 'react-redux';
import { fetchSettingsIfNeeded, } from '../../../actions/settings';

class GroupListSurface extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchSettingsIfNeeded());
    }

    render() {
        let settings = this.props.settings || {};
        return (
            <div>
                {settings.hasSettings ? <SubHeader settings={this.props.settings} /> : null}
            </div>
        );
    }
}
GroupListSurface.propTypes = {
    dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return { settings: state.settings };
};

export default connect(mapStateToProps)(GroupListSurface);