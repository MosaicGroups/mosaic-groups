import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

const GroupRow = ({ group }) => {
    return (
        <tr >
            <td>
                {group.title}
            </td>
            <td>
                <OverlayTrigger placement="right" overlay={(
                    <Popover id={group._id} >
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
                {group.leaders.map(leader => <span className="row" key={leader._id}>{leader.firstName} {leader.lastName} </span>)}
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
                actions
                                    </td>
        </tr>
    );
};

export default GroupRow;