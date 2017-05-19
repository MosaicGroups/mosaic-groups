import React from 'react';
import { Row, Col } from 'react-bootstrap';

const DatesMessage = ({ settings }) => {
    return settings.datesMsg ? (
        <Row>
            <div className="col-md-6 col-md-offset-3">
                <h5 className=" text-center"> {settings.datesMsg}</h5>
            </div>
        </Row>
    ) : null;

};
export default DatesMessage;