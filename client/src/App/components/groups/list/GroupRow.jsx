import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const GroupRow = ({ group, children }) => {
    return (
        <tr>
            <td>
                {group.title}
            </td>
            <td>
                <OverlayTrigger placement="right" overlay={(
                    <Popover id={group._id||group.title} >
                        {group.description}
                    </Popover>
                )}>
                    <a >Details...</a>
                </OverlayTrigger>
            </td>
            <td>
                {group.audienceType}
            </td>
            <td>
                {group.leaders.map((leader, idx) => <div className="row" key={idx}>{leader.firstName} {leader.lastName} </div>)}
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
                {group.topics.map(topic => <span className="row" key={topic}>{topic} </span>)}
            </td>
            <td>
                {children}
            </td>
        </tr>
    );
};

export default GroupRow;