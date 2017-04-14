import React from 'react';
import {  Well, Row } from 'react-bootstrap';
class FilterWell extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<Well>
            <div className="h3">Filter The Groups By:</div>
        </Well>);
    }
}
export default FilterWell;