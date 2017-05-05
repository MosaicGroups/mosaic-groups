import React from 'react';
import CreateEditForm from '../users/createEdit/CreateEditForm.jsx';
import { connect } from 'react-redux';
import { updateUser, fetchUsersIfNeeded } from '../../actions/users';
import { updateAuthUser } from '../../actions/identity';
class ProfileSurface extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchUsersIfNeeded());
    }
    submit(user) {
        const { dispatch, initialValues } = this.props;

        if (initialValues) {
            user._id = initialValues._id;
            dispatch(updateUser(user));
            dispatch(updateAuthUser(user));
        }

    }
    render() {
        let initialValues = this.props.initialValues || {};
        return (
            initialValues._id ? (
                <CreateEditForm
                    isUpdate={true}
                    onSubmit={this.submit}
                    initialValues={initialValues}
                    labels={{
                        title: 'Profile',
                        submit: 'Submit'
                    }}
                />
            ) : null
        );
    }
}

const mapStateToProps = state => {
    return {
        initialValues: state.identity
    };
};

export default connect(mapStateToProps)(ProfileSurface);