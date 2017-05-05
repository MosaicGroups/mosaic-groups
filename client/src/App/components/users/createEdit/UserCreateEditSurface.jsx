import React from 'react';
import { connect } from 'react-redux';
import CreateEditForm from './CreateEditForm.jsx';
import { fetchUsersIfNeeded, addUser, updateUser } from '../../../actions/users';
import { updateAuthUser } from '../../../actions/identity';


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
            dispatch(updateAuthUser(user));
        }
        else {
            dispatch(addUser(user));
        }
    }
    render() {
        return (
            <CreateEditForm
                allowRoleFields={true}
                initialValues={this.props.initialValues}
                onSubmit={this.submit}
                identity={this.props.identity}
                isUpdate={this.props.initialValues}
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
        identity: state.identity
    };
};
export default connect(mapStateToProps)(UserCreateEditSurface);
