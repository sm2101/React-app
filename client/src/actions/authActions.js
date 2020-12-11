import {GET_ERRORS} from './types';
import axios from 'axios';

export const registerUser = (userData, history) => dispatch =>{
    axios.post(
        'http://localhost:5000/api/users/register',userData)
        .then(res =>{console.log(res.data);})
        .catch(err =>{ history.push('/profile');
        dispatch({
            type : GET_ERRORS,
            payload: err.response.data
        })
    })
}