import React from 'react';
import { Well, Row, Col } from 'react-bootstrap';
import LabeledRow from '../../common/LabeledRow.jsx';

const DescriptionWell = ({ group }) => (
    <Well>
        <LabeledRow label="Group Name:">
            <span>{group.title}</span>
        </LabeledRow>
        <LabeledRow label="Leader(s):">
            {group.leaders.map(l => <span key={l.username}>{`${l.firstName} ${l.lastName} <${l.username}>`}<br /></span>)}
        </LabeledRow>
        <LabeledRow label="Location:">
            <span>{group.location}</span>
        </LabeledRow>
        <LabeledRow label="Day Of Week:">
            <span>{group.dayOfTheWeek}</span>
        </LabeledRow>
        <LabeledRow label="Time:">
            <span>{group.meetingTime}</span>
        </LabeledRow>
        <LabeledRow label="Audience:">
            <span>{group.audienceType}</span>
        </LabeledRow>
        <LabeledRow label="Childcare:">
            <span> {group.childcare ? 'Yes' : 'No'}</span>
        </LabeledRow>
        <LabeledRow label="Topic(s):">
            {group.topics.map(topic => <span key={topic} >{topic}</span>)}
        </LabeledRow>
        <LabeledRow label="Description:">
            <span>{group.description}</span>
        </LabeledRow>
       
        <Row>
            <Col md={12}>
                <i>
                    <span>If you have any questions about this group send an email to: </span>
                    {group.leaders.map(l => <span key={l.username}>{`${l.firstName} ${l.lastName} <${l.username}>`}<br /></span>)}
                    
                </i>
            </Col>
        </Row>
    </Well>
);

export default DescriptionWell;