import { GET_ALL_ARTICLE } from '../constants';
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

module.exports = combineReducers({
  routing: routerReducer,
  articles
})
