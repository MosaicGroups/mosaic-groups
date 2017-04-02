import React from 'react';
import { connect } from 'react-redux';
import { updateSettings } from '../../../../actions';

class DatesMessage extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let style = { width: '650px' };
        let settings = this.props.settings || {};
        return (
            <div>
                <div className="row" style={style}>
                    {settings.datesMsg ? <h5> {settings.datesMsg}</h5> : null}
                </div>
            </div>
        );
    }
}
DatesMessage.propTypes = {
    dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        settings: state.settings,
        identity: state.identity
    };
};

export default connect(mapStateToProps)(DatesMessage);