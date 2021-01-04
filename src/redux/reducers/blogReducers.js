import { DATA_LOADING, STOP_DATA_LOADING, SET_BLOGS, SET_ONE_BLOG, DATA_ERROR, CLEAR_DATA_ERROR } from '../types'

const initialState = {
    loading:  false,
    blogs: [],
    singleBlog: {},
    error: null
}
// eslint-disable-next-line
export default function(state = initialState, action){
    switch (action.type) {
        case DATA_LOADING: {
            return {...state, loading: true}
        }    
        case STOP_DATA_LOADING: {
            return {...state, loading: false}
        }   
        case SET_BLOGS: {
            return {
                ...state, 
                blogs: action.payload   
            }
        } 
        case SET_ONE_BLOG: {
            return {
                ...state,
                singleBlog: action.payload
            }
        }
        case DATA_ERROR:{
            return {
                ...state,
                error: action.payload
            }
        }
        case CLEAR_DATA_ERROR:{
            return {
                ...state,
                error: null
            }
        }
        default: 
            return state
    }
}

