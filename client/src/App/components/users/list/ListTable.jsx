import React from 'react';
import { Button } from 'react-bootstrap';
import Confirm from '../../common/modal/Confirm.jsx';
import { deleteUser } from '../../../actions/users.js';
import { connect } from 'react-redux';

const columns = ['Username (Email)', 'Name', 'Admin', 'Super Admin', 'Actions'];

class RemoveUserButton extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    style = {
        'marginLeft' : '5px',
        'display' : 'inline'
    }
    
    render() {
        const user = this.props.user;
        return (<div style={this.style}>
            <Button bsStyle="danger" onClick={(e) => {
                e.preventDefault();
                this.refs.confirm.show()
                    .then(() => this.props.onClick(user))
                    .catch(() => { });
            }} className="btn btn-primary">Delete</Button>
            <Confirm ref="confirm">
                <span>Are you sure you want to delete the user: {user.username}</span>
            </Confirm>
        </div>);
    }
}

class ListTable extends React.Component {    
    
    constructor(props) {
        super(props);
    }
    
    removeUser = (user) => {
        const { dispatch } = this.props;
        dispatch(deleteUser(user));
    }
    
    render() {
        let users = this.props.users;
        return (
            <div>
                <table className="table table-condensed table-striped table-hover">
                    <thead>
                        <tr>
                            {columns.map(column => (
                                <th className="header" key={column}>{column}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user,idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{user.username}</td>
                                    <td>{`${user.firstName} ${user.lastName}`}</td>
                                    <td>{user.roles.includes('admin') ? 'Yes' : 'No'}</td>
                                    <td>{user.roles.includes('superadmin') ? 'Yes' : 'No'}</td>
                                    <td>
                                        <a href={`/user/createEdit/${user._id}`} className="btn btn-default">Edit</a>
                           
                                        <RemoveUserButton user={user} onClick={this.removeUser}/>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect()(ListTable);