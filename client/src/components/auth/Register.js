import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
class Register extends Component {
    constructor(){
        super();
        this.state = {
            name:'',
            email :'',
            password:'',
            password2:'',
            errors:{}
        }
        this.handleChange  = this.handleChange.bind(this);
        this.handleSubmit  = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

componentWillReceiveProps(nextProps){
    if(nextProps.errors){
        this.setState({errors:nextProps.errors})
    }
}
handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
}
handleSubmit(event){
    event.preventDefault();
    const newUser = {
        name:this.state.name,
        email:this.state.email,
        password:this.state.password,
        password2:this.state.password2
    }
    this.props.registerUser(newUser, this.props.history);
}


    render() {
        const { errors } = this.state;

        return (
            <div className = 'register h-100'>
                <div className="container-fluid m-0 p-0 h-100">
                    <div className="row align-items-center h-100">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">
                                Register
                            </h1>
                            <p className="lead text-center">
                                Create your potterhead account
                            </p>
                            <form>
                                <TextFieldGroup 
                                placeholder = "Name"
                                name = "name"
                                type = "text"
                                value = {this.state.name}
                                onChange = {this.handleChange}
                                error = {errors.name}
                                label = 'Name'
                                />
                                <TextFieldGroup 
                                placeholder = "Email"
                                name = "email"
                                type = "email"
                                value = {this.state.email}
                                onChange = {this.handleChange}
                                error = {errors.email}
                                label = 'Email'
                                />
                                <TextFieldGroup 
                                placeholder = "Password"
                                name = "password"
                                type = "password"
                                value = {this.state.password}
                                onChange = {this.handleChange}
                                error = {errors.password}
                                label = 'Password'
                                />
                                <TextFieldGroup 
                                placeholder = "Confirm Password"
                                name = "password2"
                                type = "password"
                                value = {this.state.password2}
                                onChange = {this.handleChange}
                                error = {errors.password2}
                                label = 'Confirm Password'
                                />
                                
                                <input 
                                type = "submit" 
                                className = "btn btn-secondary w-100 form-control" 
                                value = "Get sorted ->"  
                                onClick = {this.handleSubmit}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser :PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStatetoProps = (state) =>({
    auth:state.auth,
    errors:state.errors
})
export default connect(mapStatetoProps,{ registerUser})(withRouter(Register));