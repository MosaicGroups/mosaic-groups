import React from 'react';
import { connect } from 'react-redux';
import CreateEditForm from './CreateEditForm.jsx';
import { fetchUsersIfNeeded, addUser, updateUser } from '../../../actions/users';

class UserCreateEditSurface extends React.Component {
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
        }
        else {
            dispatch(addUser(user));
        }
    }
    render() {
        return (
            <CreateEditForm
                initialValues={this.props.initialValues}
                onSubmit={this.submit}
                labels={{
                    title: 'Create/Edit User',
                    submit: 'Submit'
                }}
            />
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const userId = ownProps.match.params.id || '';
    let matchingUsers = [];
    if (state.users.users) {
        matchingUsers = state.users.users.filter(user => user._id == userId);
    }

    let initialValues;
    if (matchingUsers.length === 1) {
        initialValues = matchingUsers[0];
    }
    return {
        initialValues,
    };
};
export default connect(mapStateToProps)(UserCreateEditSurface);