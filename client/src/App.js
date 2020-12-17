import './App.css';
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser} from './actions/authActions';


// check token
if(localStorage.jwtToken){
    // set aut 
    setAuthToken(localStorage.jwtToken);
    //  decode
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
}

function App(){
        return ( 
            <Provider store = {store}>
                <Router>
                    <div className = "App" >
                        <Navbar />
                        <Route exact path = "/" component = {Landing} />
                        <div className="container">
                        <Route exact path = "/login" component = {Login} />
                        <Route exact path = "/register" component = {Register} />
                        </div>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
}

export default App;