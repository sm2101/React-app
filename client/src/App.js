import './App.css';
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';



function App(){
        return ( 
            <Provider store = {store}>
                <Router>
                    <div className = "App" >
                        <Navbar />
                        <Route exact path = "/" component = {Landing} />
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
}

export default App;