import React from 'react';
import { Well, Row, Col } from 'react-bootstrap';
import Multiselect from 'react-bootstrap-multiselect';
import 'react-bootstrap-multiselect/css/bootstrap-multiselect.css';
import {
    daysOfTheWeek,
    meetingTimes,
    audienceTypes,
    availableTopics
} from '../../../constants';
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
        this.daysOfTheWeekOptions = daysOfTheWeek.map(d => {
            return { value: d };
        });
        this.dotwChecked = [];
        this.filters = new Map();


    }
    doFilter(key, filterValue) {

        let filterdGroups = this.props.groups || [];
        // if a key is passed along with an empty value, then we need to delete that filter
        if (!filterValue || (filterValue && filterValue.length == 0)) {
            this.filters.delete(key);
        }

        // if the filter is an array (ie. the dropdowns) --
        else if (Array.isArray(filterValue)) {
            this.filters.set(key, key => g => {

                return filterValue.filter(element => {
                    if (Array.isArray(g[key])) {
                        // some values are an array, such as the group.topics
                        return g[key].filter(i => i.toLowerCase() === element.toLowerCase()).length > 0;
                    } else {
                        // and some are flat like audience
                        return g[key].toLowerCase() === element.toLowerCase();
                    }
                }).length > 0;


            });
        }
        // if the filter is a string (ie. the input boxes)   
        else if (filterValue.length > 0) {
            this.filters.set(key, key => g => g[key].toLowerCase().includes(filterValue.toLowerCase()));
        }

        // apply all filters
        this.filters.forEach((value, key) => {
            filterdGroups = filterdGroups.filter(value(key));
        });


        this.props.updateFilter(filterdGroups);

    }

    render() {
        let dotwChecked = this.dotwChecked;
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
            <FilterElement label="Day">
                <Multiselect
                    onChange={(option, checked) => {
                        // if the checkbox is being checked, and its not already in the list, then add it
                        if (checked && !dotwChecked.includes(option.val())) {
                            dotwChecked.push(option.val());

                        }
                        // otherwise, we are removing it
                        else {
                            dotwChecked = dotwChecked.filter(day => day !== option.val());
                        }
                        this.doFilter('dayOfTheWeek', dotwChecked);

                    }}
                    data={this.daysOfTheWeekOptions} multiple />

            </FilterElement>
            <FilterElement label="Audience">
                <select name="audienceFilter" className="form-control" onChange={(e) => {

                    if (e.target.value && e.target.value.length > 0) {
                        this.doFilter('audienceType', [e.target.value]);
                    }
                    else {
                        this.doFilter('audienceType', []);
                    }
                }} >
                    <option value=""></option>
                    {audienceTypes.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
            </FilterElement>
            <FilterElement label="Topic">
                <select name="topicFilter" className="form-control" onChange={(e) => {
                    if (e.target.value && e.target.value.length > 0) {
                        this.doFilter('topics', [e.target.value]);
                    }
                    else {
                        this.doFilter('topics', []);
                    }
                }} >
                    <option value=""></option>
                    {availableTopics.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
            </FilterElement>
        </Well>);
    }
}
export default FilterWell;