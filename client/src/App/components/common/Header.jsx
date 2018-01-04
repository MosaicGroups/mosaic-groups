import React from 'react';
import Navigation from './Navigation.jsx';
import { connect } from 'react-redux';


const Header = ({ identity }) => (
    <div className="navbar navbar-inverse navbar-fixed-top ">
        <div className="container-fluid">
            <div className="navbar-header">
                <a href="/" className="navbar-brand col-md-6">
                    <img className="headerLogoImage" src="/img/navbarBrand.png" />
                </a>
            </div>
            {identity.username ? <Navigation identity={identity} /> : null}
        </div>
    </div>
);
const mapStateToProps = state => {
    
    return { identity: state.identity };
};
export default connect(mapStateToProps)(Header);

