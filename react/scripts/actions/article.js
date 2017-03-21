import axios from 'axios';
import { GET_ALL_ARTICLE } from '../constants';

export const getAllArticles = () => {
  return (dispatch, getState) => {
    axios.get('/articles.json').then(response => {
      let { data } = response;
      if (data.code === 200) {
        dispatch({
          type: GET_ALL_ARTICLE,
          articles: data.response
        })
      }
    })
  }
}