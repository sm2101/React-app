import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            email :'',
            password:'',
            password2:'',
            err:{}
        }
        this.handleChange  = this.handleChange.bind(this);
        this.handleSubmit  = this.handleSubmit.bind(this);
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
    axios.post('http://localhost:5000/api/users/register',newUser).then(res =>{
        console.log(res.data);
    }).catch(err =>{
        console.log(err);
    })
}


    render() {
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
                                    className="form-control form-control-lg"
                                    placeholder= 'Name'
                                    name = 'name'
                                    value = {this.state.name}
                                    onChange = {this.handleChange}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor = "email" className = "form-label">Email:</label>
                                    <input 
                                    type="email" 
                                    id = "email"
                                    className="form-control form-control-lg"
                                    placeholder= 'Email'
                                    name = 'email'
                                    value = {this.state.email}
                                    onChange = {this.handleChange}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor = "pass" className = "form-label">Password:</label>
                                    <input 
                                    type="password" 
                                    id = "pass"
                                    className="form-control form-control-lg"
                                    placeholder= 'Password'
                                    name = 'password'
                                    value = {this.state.password}
                                    onChange = {this.handleChange}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor = "pass2" className = "form-label">Confirm Password:</label>
                                    <input 
                                    type="password" 
                                    id = "pass2"
                                    className="form-control form-control-lg"
                                    placeholder= 'Confirm Password'
                                    name = 'password2'
                                    value = {this.state.password2}
                                    onChange = {this.handleChange}
                                    />
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

export default Register;