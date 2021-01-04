import useSanity from '../../utils/useSanity';
import { SET_USER, USER_LOADING, STOP_USER_LOADING, USER_ERROR, CLEAR_USER_ERROR } from '../types'

export const getMyInformation = () => dispatch => {
    dispatch({type: USER_LOADING})
    dispatch({type: CLEAR_USER_ERROR})
    useSanity
        .fetch(
            `*[_type == "author"]{
                name,
                bio,
                "authorImage": image.asset->url
            }`
        )
        .then(data => {
            dispatch({type: SET_USER, payload: data[0]})
        })
        .catch(error => {
            dispatch({type: USER_ERROR, payload: error})
        })
        .finally(() => {
            dispatch({type: STOP_USER_LOADING})
        })
}