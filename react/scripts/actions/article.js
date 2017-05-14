import axios from 'axios';
import { GET_ALL_ARTICLE, GET_ARTICLE, GET_RM } from '../constants';

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

export const getArticle = (id) => {
  return (dispatch, getState) => {
    axios.get(`/db/blogs/${id}`).then(response => {
      var rm = response.data.md;
      getMD(rm)(dispatch, getState);
      dispatch({
        type: GET_ARTICLE,
        article: response.data
      });
    });
  }
}

export const getMD = (url) => {
  return (dispatch, getState) => {
    axios.get(url).then(response => {
      console.log(response)
      dispatch({
        type: GET_RM,
        RM: response.data
      });
    });
  }
}
