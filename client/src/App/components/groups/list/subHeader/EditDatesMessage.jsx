import React from 'react';
import { Field, reduxForm } from 'redux-form';

const EditDatesMessage = ({ settings, handleSubmit }) => {
  
    return (
        <div className="row">
            <form name="datesMsgForm" className="form-horizontal" onSubmit={handleSubmit}>
                <div className="col-md-6 col-md-offset-3">
                    <label htmlFor="msgDates" className="col-md-4 control-label">Update Dates Message:</label>
                    <div className="col-md-6">
                        <Field component="input" name="msgDates" className="form-control" value={settings.datesMsg} />
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn">Save</button>
                    </div>
                </div>
            </form>
        </div>
    );

};

export default reduxForm({
    form: 'modifydatesmessage',  // a unique identifier for this form

})(EditDatesMessage);