import React from 'react';



const SubHeader = ({ settings, identity }) => {

    return (
        <div className="jumbotron text-center">
            {settings.showNextSemesterMsg ? <h2>{settings.nextSemesterMsg}</h2> : (
                <h2>Join a Mosaic Growth Group</h2>
            )}
        </div>
    );
};
export default SubHeader;