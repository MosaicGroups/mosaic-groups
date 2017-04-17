import React from 'react';
import { Well, Row, Col } from 'react-bootstrap';

const FilterElement = ({ label, children }) => {
    return (
        <Row>
            <Col md={4}>
                <label className="control-label">{label}</label>
            </Col>
            <Col md={8}>
                {children}
            </Col>
        </Row>
    );
};

class FilterWell extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        let groups = this.props.groups|| [];
        let updateFilter = this.props.updateFilter;
        return (<Well>
            <Row>
                <div className="h3">Filter The Groups By:</div>
            </Row>
            <FilterElement label="Title">
                <input name="titleFilter" placeholder="Filter Title" type="text" autoComplete="off" className="form-control" onChange={(e) => {
                    let value = e.target.value;

                    value ?
                        updateFilter(groups.filter(g => g.title.includes(value))) : updateFilter(groups);
                }}/>
            </FilterElement>
        </Well>);
    }
}
export default FilterWell;