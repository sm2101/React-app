import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Login from '../auth/Login';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { logoutUser} from '../../actions/authActions';
class Navbar extends Component {
    onLogout(event){
        event.preventDefault();
        this.props.logoutUser();
        
    }
    render() {
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <ul className = "navbar-nav mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user.name}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a 
                    onClick = {this.onLogout.bind(this)} 
                    className = ' nav-item dropdown-item'>
                        Logout
                    </a></li>
                </ul>
                </li>
            </ul>
        );
        const guestLinks = (
            <Login />
        )
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to = '/'>PotterHeads</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Quizzez</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        
                    </ul>
                    {isAuthenticated? authLinks : guestLinks}
                    </div>
                </div>
                </nav>
        )
    }
}

Navbar.propTypes = {
    logoutUser :PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired
}
const mapStateToProps = (state) =>({
    auth:state.auth
})

export default connect(mapStateToProps, {logoutUser})(Navbar);