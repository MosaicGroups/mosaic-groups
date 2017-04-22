import React from 'react';
import { FormGroup, ControlLabel, Col } from 'react-bootstrap';

const InputRow = ({ label, children, left=4, right=8 }) => {
    return (
        <FormGroup>
            <Col md={left} className="text-right">
                <ControlLabel className="control-label">{label}</ControlLabel>
            </Col>   
            <Col md={right}>
           
                {children}
            </Col>    
        </FormGroup>
    );
};

export default InputRow;