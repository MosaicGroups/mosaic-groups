import React from 'react';
import { OverlayTrigger, Popover, Row, Col } from 'react-bootstrap';

const GroupRow = ({ group, children }) => {
    return (
        <tr>
            <td>
                {group.title}
            </td>
            <td>
                <OverlayTrigger placement="right" trigger="click" rootClose="true" overlay={(
                    <Popover id={group._id || group.title} >
                        {group.description}
                    </Popover>
                )}>
                    <a style={{cursor: 'pointer'}}>Details...</a>
                </OverlayTrigger>
            </td>
            <td>
                {group.audienceType}
            </td>
            <td>
                 <Row>
                    {group.leaders && group.leaders.map((leader, idx) => <Col md={12} key={idx}>{leader.firstName} {leader.lastName} </Col>)}
                 </Row>
            </td>
            <td>
                {group.location}
            </td>
            <td>
                {group.meetingTime}
            </td>
            <td>
                {group.childcare ? 'Yes' : 'No'}
            </td>
            <td>
                <Row>
                    {group.topics.map(topic => <Col md={12} key={topic}> {topic} </Col>)}
                </Row>
            </td>
            <td>
                {children}
            </td>
        </tr>
    );
};

export default GroupRow;