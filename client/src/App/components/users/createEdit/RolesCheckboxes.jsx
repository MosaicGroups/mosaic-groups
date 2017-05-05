import React from 'react';
import InputRow from '../../common/InputRow.jsx';

const RolesCheckboxes = (props) => {

    let { name, input, spacing = {}, identity = {} } = props;

    let identityRoles = identity.roles || [];

    return (
        <div>
            {identityRoles.includes('admin') || identityRoles.includes('superadmin') ? (
                <InputRow {...spacing} label="Admin">
                    <input
                        type="checkbox"
                        name={`${name}[0]`}
                        value={'admin'}
                        checked={input.value.includes('admin')}
                        onChange={event => {

                            const newValue = [...input.value];
                            if (event.target.checked) {
                                newValue.push('admin');
                            } else {
                                newValue.splice(newValue.indexOf('admin'), 1);
                            }

                            return input.onChange(newValue);
                        }} />
                </InputRow>
            ) : null}
            {identityRoles.includes('superadmin') ? (
                <InputRow {...spacing} label="Super Admin">
                    <input
                        type="checkbox"
                        name={`${name}[1]`}
                        value={'superadmin'}
                        checked={input.value.includes('superadmin')}
                        onChange={event => {

                            const newValue = [...input.value];
                            if (event.target.checked) {
                                newValue.push('superadmin');
                            } else {
                                newValue.splice(newValue.indexOf('superadmin'), 1);
                            }

                            return input.onChange(newValue);
                        }} />


                </InputRow>
            ) : null}

        </div>
    );
};

export default RolesCheckboxes;