import React from 'react';

const Navigation = ({ identity }) => (
    <div className="navbar-right ">

        <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">

                <a href="" data-toggle="dropdown" className="logged-in dropdown-toggle">
                    <b className="logged-in">
                        {`${identity.firstName} ${identity.lastName}`}
                        <div className="caret"></div>
                    </b>
                </a>
                <ul className="dropdown-menu">
                    {identity.roles.includes('admin') ? (<li ><a href="/views/userList/user-list">List Users</a></li>) : null}

                    {identity.roles.includes('admin') ? (<li ><a href="/views/userCreate/user-create">Create User</a></li>) : null}

                    {identity.roles.includes('admin') ? (<li className="divider "></li>) : null}


                    <li><a href="/views/groupList/group-list">List Groups</a></li>

                    <li><a href="/views/groupCreateOrEdit/group-create-or-edit">Create Group</a></li>
                    <li className="divider"></li>

                    <li><a href="/views/profile/profile">Profile</a></li>
                    <li><a href="/logout">Sign Out</a></li>
                </ul>
            </li>
        </ul>
    </div>
);

export default Navigation;