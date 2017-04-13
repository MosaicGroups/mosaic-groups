import React from 'react';

import GroupRow from './GroupRow.jsx';
import ActionLinks from './ActionLinks.jsx';

const days = ['6-Week Groups', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const columns = ['Title', 'Details', 'Audience', 'Leader', 'Location', 'Time', 'Childcare', 'Topic', 'Action'];

const ListTable = ({ groups }) => {
    return (
        <div className="container">
            <table className="table table-condensed table-bordered">
                <thead >
                    <tr >
                        {columns.map(column => (
                            <th className="header" key={column}>
                                {column}
                            </th>
                        ))}

                    </tr>
                </thead>
                {days
                    // remove days for which there are no groups    
                    .filter(day => groups.filter(group => group.dayOfTheWeek === day).length > 0)
                    .map(day => (
                        <tbody key={day}>
                            <tr className="ng-table-group groups-group-row">
                                <td colSpan="9" className="groups-group-cell">
                                    <span className="groups-group-title">
                                        <span className="glyphicon glyphicon-chevron-down">
                                        </span>&nbsp;<span>{day}
                                        </span>
                                    </span>
                                </td>
                            </tr>
                            {groups
                                // now we want all groups for a given day    
                                .filter(group => group.dayOfTheWeek === day)
                                .map((group, idx) => {
                                    return (
                                        <GroupRow group={group} key={idx} >
                                            <ActionLinks group={group} />
                                        </GroupRow>
                                    );
                                })
                            }
                        </tbody>
                    )
                    )}
            </table>
        </div>
    );
};

export default ListTable;