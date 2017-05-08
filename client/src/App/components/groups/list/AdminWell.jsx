import React from 'react';
import { Well, Row, Col, Button } from 'react-bootstrap';
import * as request from 'superagent';
import { toastr } from 'react-redux-toastr';

const AdminWell = () => (
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
    </Well>
);

export default AdminWell;