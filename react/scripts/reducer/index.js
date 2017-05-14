import { GET_ALL_ARTICLE, GET_RM, GET_ARTICLE } from '../constants';
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

var articles = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_ARTICLE:
      return action.articles;
    default:
      return state;
  }
}

var article = (state = {}, action) => {
  switch (action.type) {
    case GET_ARTICLE:
      return Object.assign({}, state, { 
        article: action.article 
      });
    case GET_RM:
      return Object.assign({}, state, {
        RM: action.RM
      })
    default: 
      return state;
  }
}

module.exports = combineReducers({
  routing: routerReducer,
  articles,
  article
})
