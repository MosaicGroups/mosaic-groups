import React from 'react';
import { Well, Row, Col } from 'react-bootstrap';
const VideoWell = () => (
    <Well>
        <Row>
            <Col md={12}>
                <iframe src="https://www.youtube.com/embed/SDf-XXzLNGk" width="100%" height="200" frameBorder="0" allowFullScreen="allowfullscreen"></iframe>
            </Col>
        </Row>
    </Well>
);

export default VideoWell;