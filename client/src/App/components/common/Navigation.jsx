import React from 'react';
import { apiPath } from '../../utils/index.js';

const Navigation = ({ identity }) => (
    <div className="container-fluid">
        <div className="navbar-right">

            <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">

                    <a href="" data-toggle="dropdown" className="logged-in dropdown-toggle" style={{lineHeight:'45px'}}> {/* match win-width 75px from reset.css */}
                        <b className="logged-in">
                            {`${identity.firstName} ${identity.lastName}`}
                            <div className="caret"></div>
                        </b>
                    </a>
                    <ul className="dropdown-menu">
                        {identity.roles.includes('admin') ? (<li ><a href="/user/list">List Users</a></li>) : null}

                        {identity.roles.includes('admin') ? (<li ><a href="/user/createEdit">Create User</a></li>) : null}

                        {identity.roles.includes('admin') ? (<li className="divider "></li>) : null}


                        <li><a href="/">List Groups</a></li>

                        <li><a href="/group/createEdit">Create Group</a></li>
                        <li className="divider"></li>

                        <li><a href="/profile">Profile</a></li>
                        <li><a href="{apiPath + '/logout'}">Sign Out</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
);

export default Navigation;