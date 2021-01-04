import useSanity from '../../utils/useSanity';
import { DATA_LOADING, STOP_DATA_LOADING, SET_BLOGS, SET_ONE_BLOG, DATA_ERROR, CLEAR_DATA_ERROR } from '../types'

export const getAllBlogs = () => dispatch => {
    dispatch({type: DATA_LOADING})
    dispatch({type: CLEAR_DATA_ERROR})
    useSanity
        .fetch(`*[_type == "post"]{
            title,
            slug,
            mainImage{
                asset->{
                    _id,
                    url
                },
                alt
            },
            publishedAt
        }`)
    .then(data => {
        dispatch({type: SET_BLOGS, payload: data})
    })
    .catch(err => {
        dispatch({type: DATA_ERROR, payload: err})
    })
    .finally(() => {
        dispatch({type: STOP_DATA_LOADING})
    })
}

export const getOneBlog = (slug) => dispatch => {
    dispatch({type: DATA_LOADING})
    dispatch({type: CLEAR_DATA_ERROR})
    useSanity.fetch(`*[slug.current == "${slug}"]{
        title,
        _id,
        mainImage{
            asset->{
                _id,
                url
            }
        },
        body,
        "name": author->name,
        "authorImage": author->image
    }`)
    .then(data => {
        dispatch({type: SET_ONE_BLOG, payload: data[0]})
    })
    .catch(err => {
        dispatch({type: DATA_ERROR, payload: err})
    })
    .finally(() => {
        dispatch({type: STOP_DATA_LOADING})
    })
}
