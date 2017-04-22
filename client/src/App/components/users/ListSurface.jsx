import React from 'react';
import { connect } from 'react-redux';
import ListTable from './ListTable.jsx';
import { fetchUsersIfNeeded } from '../../actions/users';

class ListSurface extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 'users' : this.props.users.users } ;
    }
    
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchUsersIfNeeded());
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.users.users !== nextProps.users.users) {
            this.setState({ users: nextProps.users.users });
        }
    }
    
    render() {
        let users = this.state.users || {};
        let hasUsers = this.props.users.hasUsers;
        return (
            <div className="col-md-8 col-md-offset-2">
                <h1>Users</h1>
                {hasUsers ? <ListTable users={users} /> : null}
            </div>
        );
    }
}

//ListSurface.propTypes = {
//    dispatch: React.PropTypes.func.isRequired
//};

const mapStateToProps = state => {
    return {
        users: state.users
    };
};

export default connect(mapStateToProps)(ListSurface);