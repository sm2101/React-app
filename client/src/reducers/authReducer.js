import {} from '../actions/types';
const initialState = {
    isAuthenticated:false,
    user:{}
}

export default function(state = initialState, action){
    switch(action.type){
        case testcase:
            return{
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}