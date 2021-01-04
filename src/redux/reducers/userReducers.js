import { SET_USER, STOP_USER_LOADING, USER_LOADING, USER_ERROR, CLEAR_USER_ERROR } from '../types';

const initialState = {
    loading: false,
    user: {},
    error: null
}
// eslint-disable-next-line
export default function(state = initialState, action) {
    switch (action.type) {
        case SET_USER: {
            return {...state, user: action.payload}
        }
        case USER_LOADING: {
            return {...state, loading: true }
        }
        case STOP_USER_LOADING: {
            return {...state, loading: false }
        }
        case USER_ERROR: {
            return {...state, error: action.payload}
        } 
        case CLEAR_USER_ERROR : {
            return {...state, error: null}
        }
        default:
            return state
    }
}

