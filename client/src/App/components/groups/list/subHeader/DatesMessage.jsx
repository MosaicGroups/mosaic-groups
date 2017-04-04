import React from 'react';

const DatesMessage = ({ settings }) => {
    return settings.datesMsg ? (
        <div className="col-md-6 col-md-offset-3">
            <h5 className=" text-center"> {settings.datesMsg}</h5>
        </div>
    ) : null;

};
export default DatesMessage;