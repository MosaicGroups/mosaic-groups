import React from 'react';

const DatesMessage = ({ settings }) => {
    let style = { width: '650px' };
    return settings.datesMsg ? (<div>
        <div className="row" style={style}>
            <h5> {settings.datesMsg}</h5>
        </div>
    </div>) : null;

};

DatesMessage.propTypes = {
    //dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        settings: state.settings
    };
};

export default DatesMessage;