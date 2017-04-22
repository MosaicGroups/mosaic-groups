import React from 'react';
import { Button } from 'react-bootstrap';

const columns = ['Username (Email)', 'Name', 'Admin', 'Super Admin', 'Actions'];

const deleteButtonStyle = {
    'marginLeft' : '5px'
};

const ListTable = ({ users }) => {
    return (
        <div>
            <table className="table table-condensed table-striped table-hover">
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th className="header" key={column}>
                                {column}
                            </th>
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
                                    <Button>Edit</Button>
                                    <Button bsStyle="danger" style={deleteButtonStyle}>Delete</Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ListTable;