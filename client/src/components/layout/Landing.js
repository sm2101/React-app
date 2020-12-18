import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import Register from '../auth/Register';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
class Landing extends Component {

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <div id = 'landing' className = "container-fluid m-0 p-0 d-flex justify-content-center h-100 w-100 text-white">
                <div className="row h-100 m-0 w-100 justify-content-around">
                    <div className="col-12 col-md-6 h-100 align-items-center d-flex">
                        <div className="landing-text row m-0 p-0 d-flex text-left">
                            <h1 className = "display-1 col-12 text-left font">Welcome</h1>
                            <h1 className = "display-2 col-12 text-left font">Potterheads</h1>

                        </div>
                    </div>
                    <div className="col-12 col-md-5 h-100">
                        <Register />
                    </div>
                </div>
            </div>
        )
    }
}
Landing.propTypes ={
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) =>({
    auth: state.auth
})
export default connect(mapStateToProps)(Landing);