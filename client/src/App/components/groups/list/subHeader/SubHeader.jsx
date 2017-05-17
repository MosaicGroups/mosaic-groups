import React from 'react';
import DatesMessage from './DatesMessage.jsx';
import EditDatesMessage from './EditDatesMessage.jsx';
import EditNextSemesterMessage from './EditNextSemesterMessage.jsx';
import { connect } from 'react-redux';
import { updateSettings } from '../../../../actions/settings.js';
import { Row } from 'react-bootstrap';

const SubHeader = ({ settings, identity, dispatch }) => {
    const updateDatesMsg = ({ msgDates }) => {
        dispatch(updateSettings('datesMsg', msgDates));
    };
    const updateNextSemesterMsg = ({ nextSemesterMsg }) => {
        dispatch(updateSettings('nextSemesterMsg', nextSemesterMsg));
    };
    return (
        <div className="jumbotron text-center" >
            {settings.showNextSemesterMsg ? (
                <div className="text-center">
                    <Row><h2>{settings.nextSemesterMsg}</h2></Row>
                    {identity.username && identity.roles.includes('admin') ? <EditNextSemesterMessage initialValues={{nextSemesterMsg: settings.nextSemesterMsg}} settings={settings} onSubmit={updateNextSemesterMsg} /> : null}
                </div>
            ) : (
                    <div className="text-center">
                        <Row>
                            <h2>Join a Mosaic Growth Group</h2>
                        </Row>
                        <DatesMessage settings={settings} />
                        {identity.username && identity.roles.includes('admin') ? <EditDatesMessage initialValues={{msgDates: settings.datesMsg}} settings={settings} onSubmit={updateDatesMsg} /> : null}
                    </div>
                )}

        </div>
    );
};

export default connect()(SubHeader);