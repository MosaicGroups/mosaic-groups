import React from 'react';
import { Well, Row } from 'react-bootstrap';
import Multiselect from 'react-bootstrap-multiselect';
import 'react-bootstrap-multiselect/css/bootstrap-multiselect.css';
import {
    daysOfTheWeek,
    audienceTypes,
    availableTopics
} from '../../../constants';
import LabeledRow from '../../common/LabeledRow.jsx';

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

        if ((!filterValue) || filterValue.length === 0) {
            this.filters.delete(key);
        }
        else {
            switch (key) {
                case 'title':
                case 'location':
                    this.filters.set(key, key => g => g[key].toLowerCase().includes(filterValue.toLowerCase()));
                    break;
                case 'dayOfTheWeek':
                case 'audienceType':
                    this.filters.set(key, key => g => {
                        return filterValue.filter(element => g[key].toLowerCase() === element.toLowerCase()).length > 0;
                    });
                    break;
                case 'topics':
                    this.filters.set(key, key => g => {
                        return filterValue.filter(element => {
                            return g[key].filter(i => i.toLowerCase() === element.toLowerCase()).length > 0;

                        }).length > 0;
                    });
                    break;
                case 'childcare':
                    this.filters.set(key, key => g => g[key] === (filterValue === 'Yes'));
                    break;
                case 'full':
                    this.filters.set(key, () => g => g.members.length < g.memberLimit);
                    break;
                default:
                    break;


            }
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
            <LabeledRow label="Title">
                <input name="titleFilter" placeholder="Filter Title" type="text" autoComplete="off" className="form-control" onChange={(e) => {
                    this.doFilter('title', e.target.value);
                }} />
            </LabeledRow>
            <LabeledRow label="Location">
                <input name="locationFilter" placeholder="Filter Location" type="text" autoComplete="off" className="form-control" onChange={(e) => {
                    this.doFilter('location', e.target.value);
                }} />
            </LabeledRow>
            <LabeledRow label="Day">
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

            </LabeledRow>
            <LabeledRow label="Audience">
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
            </LabeledRow>
            <LabeledRow label="Childcare">
                <select name="topicFilter" className="form-control" onChange={(e) => {
                    if (e.target.value && e.target.value.length > 0) {
                        this.doFilter('childcare', e.target.value);
                    }
                    else {
                        this.doFilter('childcare', '');
                    }
                }} >
                    <option value=""></option>
                    {['Yes', 'No'].map(a => <option key={a} value={a}>{a}</option>)}
                </select>
            </LabeledRow>
            <LabeledRow label="Topic">
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
            </LabeledRow>
            <LabeledRow label="Hide Full Groups">
                <input name="fullFilter" type="checkbox" className="form-control" onChange={(e) => {

                    this.doFilter('full', e.target.checked);
                }} />
            </LabeledRow>
        </Well>);
    }
}
export default FilterWell;