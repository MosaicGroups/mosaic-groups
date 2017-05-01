import { couplesGroups } from '../../../constants/index.js';

const validateEmail = email => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const checkEmails = (email, emailRetype) => email === emailRetype;

const joinFormValidation = (values, props) => {
    const errors = {};

    //basic required fields
    let requiredFields = [
        'firstName',
        'lastName',
        'email',
        'emailConfirmed',
        'gender',
        'campus',
        'phone',
        'preferContactVia'
    ];

    if (!validateEmail(values.email)) {
        errors.email = 'Email address must be valid';
    }
    if (!checkEmails(values.email, values.emailConfirmed)) {
        errors.email = 'Email addresses must match';
    }
    //couples groups have to be handled differently
    if (couplesGroups.includes(props.group.audienceType)) {
        if (values.spouse) {
            requiredFields.map(f => {

                if (!values.spouse[f]) {
                    errors[f] = 'Required';
                }
            });

            if (!validateEmail(values.spouse.email)) {
                errors.email = 'Email address must be valid';
            }

            if (!checkEmails(values.spouse.email, values.spouse.emailConfirmed)) {
                errors.email = 'Email addresses must match';
            }

        }
        else {
            errors.firstName = 'Required';
        }
    }
    else if (props.group.audienceType === 'Middle School Students' || props.group.audienceType === 'High School Students') {
        const contactRequiredFields = ['contactFirstName', 'contactLastName', 'contactPhone', 'contactEmail', 'contactEmailConfirm'];
        requiredFields = requiredFields.concat(contactRequiredFields);

        if (!validateEmail(values.contactEmail)) {
            errors.contactEmail = 'Email address must be valid';
        }
        if (!checkEmails(values.contactEmail, values.contactEmailConfirm)) {
            errors.contactEmail = 'Email addresses must match';
        }
    }

    requiredFields.map(f => {

        if (!values[f]) {
            errors[f] = 'Required';
        }
    });

    return errors;
};

export default joinFormValidation;