import React from 'react';
import { Row, Col } from 'react-bootstrap';

const LabeledRow = ({ label, children }) => {
    return (
        <Row>
            <Col md={4}>
                <label className="control-label">{label}</label>
            </Col>
            <Col md={8}>
                {children}
            </Col>
        </Row>
    );
};

export default LabeledRow;