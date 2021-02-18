import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser} from './actions/authActions';


// check token
if(localStorage.jwtToken){
    // set aut 
    setAuthToken(localStorage.jwtToken);
    //  decode
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    // expired token
    const currentTime = Date.now()/1000;
    if(decoded.exp < currentTime){
        store.dispatch(logoutUser());
        window.location.href = '/';
    }
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
                        <Route exact path = "/dashboard" component = {Dashboard} />
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
}

export default App;