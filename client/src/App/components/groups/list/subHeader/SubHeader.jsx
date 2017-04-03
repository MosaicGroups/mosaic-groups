import React from 'react';
import DatesMessage from './DatesMessage.jsx';
import EditDatesMessage from './EditDatesMessage.jsx';


const SubHeader = ({ settings, identity }) => {

    return (
        <div className="jumbotron text-center" >
            {settings.showNextSemesterMsg ? <h2>{settings.nextSemesterMsg}</h2> : (
                <div className=" text-center">
                    <div className="row">
                        <h2>Join a Mosaic Growth Group</h2>
                    </div>    
                    
                    <DatesMessage settings={settings} />
                    {identity.roles.includes('admin') ? <EditDatesMessage settings={settings} />:null}
                </div>
            )}
            
        </div>
    );
};
export default SubHeader;