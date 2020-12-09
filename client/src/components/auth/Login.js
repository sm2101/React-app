import React, { Component } from 'react'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email :'',
            password:'',
            err:{}
        }
        this.handleChange  = this.handleChange.bind(this);
        this.handleSubmit  = this.handleSubmit.bind(this);
    }

handleChange(ele){
        this.setState({
            [ele.target.name]:ele.target.value
        })
    }
    handleSubmit(event){
        event.preventDefault();
        const user = {
            email:this.state.email,
            password:this.state.password,
        }
    }
    render() {
        return (
            <ul className = "navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                <form className="d-flex">
                    <input className="form-control me-2" type="input" value = {this.state.email} onChange = {this.handleChange} placeholder="Email" name = "email" />
                    <input className="form-control me-2" type="password" value = {this.state.password} onChange = {this.handleChange} placeholder="Password" name = "password" />
                    <input className="btn btn-outline-success" type="submit" value = "Login" onSubmit = {this.handleSubmit}/>
                </form>
                </li>
            </ul>
        )
    }
}

export default Login;