import React from 'react';
import { FormGroup } from 'react-bootstrap';

const LeaderCheckboxGroup = ({ label, required, name, options, input, identity }) => {
    const isChecked = (option) => {
        if (input.value.indexOf(option._id) !== -1)
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
                        <input type="checkbox"
                            name={`${name}[${index}]`}
                            disabled={option._id === identity._id && !identity.roles.includes('admin')}
                            value={option._id}
                            checked={isChecked(option)}
                            onChange={event => {
                                const newValue = [...input.value];
                                if (event.target.checked) {
                                    newValue.push(option._id);
                                } else {
                                    newValue.splice(newValue.indexOf(option._id), 1);
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