import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            email :'',
            password:'',
            errors:{}
        }
        this.handleChange  = this.handleChange.bind(this);
        this.handleSubmit  = this.handleSubmit.bind(this);
    }


    handleChange(ele){
        this.setState({
            [ele.target.name]:ele.target.value
        })
    }
    componentDidMount(){
        console.log(this.props.auth);
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        console.log(nextProps)
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
        if(nextProps.errors){
            this.setState({errors : nextProps.errors});
        }
    }
    handleSubmit(event){
        event.preventDefault();
        const userData = {
            email:this.state.email,
            password:this.state.password,
        }
        this.props.loginUser(userData);
    }
    render() {
        const {errors} = this.state;

        return (
            <ul className = "navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                <form className="d-flex">
                    <TextFieldGroup 
                    placeholder = "Email Address"
                    name = "email"
                    type = "email"
                    value = {this.state.email}
                    onChange = {this.handleChange}
                    error = {errors.loginEmail}
                    />
                    <TextFieldGroup 
                    placeholder = "Password"
                    name = "password"
                    type = "password"
                    value = {this.state.password}
                    onChange = {this.handleChange}
                    error = {errors.loginPassword}
                    />
                    <div className = "form-group m-2">
                    <input 
                    className="btn btn-outline-success" 
                    type="submit" 
                    value = "Login" 
                    onClick = {this.handleSubmit}
                    />
                    </div>
                </form>
                </li>
            </ul>
        )
    }
}
Login.propTypes = {
    loginUser : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired
}
const mapStatetoProps = (state) =>({
    auth:state.auth,
    errors:state.errors
});
export default connect(mapStatetoProps,{loginUser})(Login);