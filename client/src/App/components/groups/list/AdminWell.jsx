import React from 'react';
import { Well, Row, Col, Button } from 'react-bootstrap';
import * as request from 'superagent';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import { updateSettings } from '../../../actions/settings.js';
const AdminWell = ({ settings, dispatch }) => (
    <Well>
        <Row>
            <div className="h3">Admin</div>
        </Row>
        <Row>
            <Col md={12}>
                <Button onClick={(e) => {
                    request.post('/api/groups/emailGroupReportToSelf')
                        .then(res => {
                            toastr.success('Success', 'Group Report email sent');
                        })
                        .catch(err => {
                            toastr.success('Error', 'There was an error sending the Group report');
                        });
                }}
                >Email Me Group Report </Button>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <Button onClick={(e) => {
                    request.post('/api/groups/emailUniqueReportToSelf')
                        .then(res => {
                            toastr.success('Success', 'Unique Members Report email sent');
                        })
                        .catch(err => {
                            toastr.success('Error', 'There was an error sending the Unique Members report');
                        });
                }}
                >Email Me Unique Members Report </Button>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <Button onClick={(e) => {
                    dispatch(updateSettings('disableGroups', !settings.disableGroups));
                }}
                >{settings.disableGroups ? 'Enable' : 'Disable'} Groups</Button><br />
                <i>- group signup is currently {settings.disableGroups ? 'disabled' : 'enabled'}</i>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <Button onClick={(e) => {
                    dispatch(updateSettings('showNextSemesterMsg', !settings.showNextSemesterMsg));
                }}
                >{settings.showNextSemesterMsg ? 'Hide' : 'Show'} Next Semester Message</Button><br />
                <i>- group list is currently being {settings.showNextSemesterMsg ? 'hidden from' : 'shown to'} users</i><br />
                {settings.showNextSemesterMsg ?<i>- update the message on the right</i> : null}
            </Col>
        </Row>
    </Well>
);

export default connect()(AdminWell);