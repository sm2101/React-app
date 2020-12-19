import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer'
import profileReducer from './profileReducer'

export default combineReducers({
    profile:profileReducer,
    auth:authReducer,
    errors:errorReducer
})