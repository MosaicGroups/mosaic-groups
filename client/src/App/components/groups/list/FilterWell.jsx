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
        this.doFilter = this.doFilter.bind(this);
    }
    doFilter(key, filterString) {
        let groups = this.props.groups || [];

        if (filterString || filterString.length > 0) {
            this.props.updateFilter(groups.filter(g => g[key].toLowerCase().includes(filterString.toLowerCase())));
        }
        else {
            this.props.updateFilter(groups);
        }
    }

    render() {
        return (<Well>
            <Row>
                <div className="h3">Filter The Groups By:</div>
            </Row>
            <FilterElement label="Title">
                <input name="titleFilter" placeholder="Filter Title" type="text" autoComplete="off" className="form-control" onChange={(e) => {
                    this.doFilter('title', e.target.value);
                }} />
            </FilterElement>
            <FilterElement label="Location">
                <input name="locationFilter" placeholder="Filter Location" type="text" autoComplete="off" className="form-control" onChange={(e) => {
                    this.doFilter('location', e.target.value);
                }} />
            </FilterElement>
        </Well>);
    }
}
export default FilterWell;