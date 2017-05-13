import axios from 'axios';
import { GET_ALL_ARTICLE } from '../constants';

export const getAllBlogs = () => {
  return (dispatch, getState) => {
    axios.get('/db/blogs').then(response => {
      console.log(response)
      dispatch({
        type: GET_ALL_ARTICLE,
        articles: response.data
      })
    })
  }
}
