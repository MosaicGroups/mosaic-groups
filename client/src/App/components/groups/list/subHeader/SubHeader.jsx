import React from 'react';
import DatesMessage from './DatesMessage.jsx';
import EditDatesMessage from './EditDatesMessage.jsx';
import { connect } from 'react-redux';
import { updateSettings } from '../../../../actions/settings.js';

const SubHeader = ({ settings, identity , dispatch}) => {
    let updateDatesMsg = ({ msgDates }) =>{
        dispatch(updateSettings( 'datesMsg', msgDates));
    };
    return (
        <div className="jumbotron text-center" >
            {settings.showNextSemesterMsg ? <h2>{settings.nextSemesterMsg}</h2> : (
                <div className="text-center">
                    <div className="row">
                        <h2>Join a Mosaic Growth Group</h2>
                    </div>    
                    
                    <DatesMessage settings={settings} />
                    {identity.username && identity.roles.includes('admin') ? <EditDatesMessage settings={settings} onSubmit={updateDatesMsg} />:null}
                </div>
            )}
            
        </div>
    );
};

export default connect()(SubHeader);