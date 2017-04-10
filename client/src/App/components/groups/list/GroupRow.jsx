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
                    <a href="" >Details...</a>
                </OverlayTrigger>
            </td>
            <td>
                {group.audienceType}
            </td>
            <td>
                leaders
                                    </td>
            <td>
                {group.location}
            </td>
            <td>
                {group.meetingTime}
            </td>
            <td>
                {group.childcare}
            </td>
            <td>
                topics
                                    </td>
            <td>
                actions
                                    </td>
        </tr>
    );
};

export default GroupRow;