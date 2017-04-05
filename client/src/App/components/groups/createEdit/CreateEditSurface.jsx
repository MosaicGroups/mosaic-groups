import React from 'react';
import { connect } from 'react-redux';
import CreateEditForm from './CreateEditForm.jsx';
import { fetchUsersIfNeeded } from '../../../actions/users';
import { addGroup } from '../../../actions/groups';

class CreateEditSurface extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchUsersIfNeeded());
    }
    submit(group) {
        const { dispatch } = this.props;
        dispatch(addGroup(group));
    }
    render() {
        return (<CreateEditForm
            users={this.props.users}
            identity={this.props.identity}
            initialValues={this.props.initialValues}
            onSubmit={this.submit
            } />);
    }
}
const mapStateToProps = state => {
    return {
        initialValues: state.group || {},
        users: state.users.users || [],
        identity: state.identity
    };
};
export default connect(mapStateToProps)(CreateEditSurface);