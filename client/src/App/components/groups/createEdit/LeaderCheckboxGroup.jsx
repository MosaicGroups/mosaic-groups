import React from 'react';
import { FormGroup } from 'react-bootstrap';
const LeaderCheckboxGroup = (props) => {
    let { label, name, options, input, identity } = props;
    const isChecked = (option) => {
        //console.log(option, input.value, input.value.indexOf(option._id) !== -1)

        if (input.value  && input.value.map(o=> o._id).indexOf(option._id) !== -1)
            return true;

        if (!identity.roles.includes('admin') && option._id === identity._id)
            return true;

        return false;
    };
    return (
        <FormGroup controlId={name}>
            {options.map((option, index) => (
                <div className="checkbox" key={index}>
                    <label>
                        <input
                            type="checkbox"
                            name={`${name}[${index}]`}
                            disabled={!identity.roles.includes('admin')}
                            value={option._id}
                            checked={isChecked(option)}
                            onChange={event => {
                                
                                const newValue = [...input.value];
                                if (event.target.checked) {
                                    newValue.push(option);
                                } else {
                                    newValue.splice(newValue.indexOf(option), 1);
                                }

                                return input.onChange(newValue);
                            }} />
                        {`${option.firstName} ${option.lastName}`}
                    </label>
                </div>))
            }
        </FormGroup>
    );
};

export default LeaderCheckboxGroup;