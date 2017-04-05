import React from 'react';
import { connect } from 'react-redux';
import CreateEditForm from './CreateEditForm.jsx';
import { fetchUsersIfNeeded } from '../../../actions/users';

class CreateEditSurface extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchUsersIfNeeded());
    }
    render() {
        return (<CreateEditForm users={this.props.users} identity={this.props.identity} initialValues={this.props.initialValues}/>);
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