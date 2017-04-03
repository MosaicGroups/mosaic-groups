import React from 'react';
import { connect } from 'react-redux';
import { updateSettings } from '../../../../actions/settings.js';

const EditDatesMessage = ({ settings }) => {
    return (
        <div className="row">
            <div className="col-md-6 col-md-offset-3">
            <label htmlFor="msgDates" className="col-md-4 control-label">Update Dates Message:</label>
            <div className="col-md-6">
                <input name="msgDates" className="form-control" value={settings.datesMsg} />
            </div>
            <div className="col-md-2">
                <button  className="btn">Save</button>
                </div>
            </div>    
        </div>
    );

};

EditDatesMessage.propTypes = {
    dispatch: React.PropTypes.func.isRequired
};


export default connect()(EditDatesMessage);