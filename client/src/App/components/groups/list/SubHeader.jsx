import React from 'react';

const SubHeader = ({ settings }) => {
    return (
        <div className="jumbotron ">
            {settings.showNextSemesterMsg ? <h2>{settings.nextSemesterMsg}</h2> : <span>Join a Mosaic Growth Group</span>}
        </div>
    );
};
export default SubHeader;