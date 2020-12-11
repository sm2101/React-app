import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';
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
                                <div className="form-group mb-2">
                                    <label htmlFor = "name" className = "form-label">Name:</label>
                                    <input 
                                    type="text" 
                                    id = "name"
                                    className={classnames("form-control form-control-lg",{
                                        'is-invalid':errors.name
                                    })}
                                    placeholder= 'Name'
                                    name = 'name'
                                    value = {this.state.name}
                                    onChange = {this.handleChange}
                                    />
                                    {errors.name && (<div className = 'invalid-feedback'>{errors.name}</div>)}
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor = "email" className = "form-label">Email:</label>
                                    <input 
                                    type="email" 
                                    id = "email"
                                    className={classnames("form-control form-control-lg",{
                                        'is-invalid':errors.email
                                    })}
                                    placeholder= 'Email'
                                    name = 'email'
                                    value = {this.state.email}
                                    onChange = {this.handleChange}
                                    />
                                    {errors.email && (<div className = 'invalid-feedback'>{errors.email}</div>)}
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor = "pass" className = "form-label">Password:</label>
                                    <input 
                                    type="password" 
                                    id = "pass"
                                    className={classnames("form-control form-control-lg",{
                                        'is-invalid':errors.password
                                    })}
                                    placeholder= 'Password'
                                    name = 'password'
                                    value = {this.state.password}
                                    onChange = {this.handleChange}
                                    />
                                    {errors.password && (<div className = 'invalid-feedback'>{errors.password}</div>)}
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor = "pass2" className = "form-label">Confirm Password:</label>
                                    <input 
                                    type="password" 
                                    id = "pass2"
                                    className={classnames("form-control form-control-lg",{
                                        'is-invalid':errors.password2
                                    })}
                                    placeholder= 'Confirm Password'
                                    name = 'password2'
                                    value = {this.state.password2}
                                    onChange = {this.handleChange}
                                    />
                                    {errors.password2 && (<div className = 'invalid-feedback'>{errors.password2}</div>)}
                                </div>
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