import constants from '../constants';

const defaultValue = {
  post: {},
  loading: false
}

export default (state = defaultValue, action) => {
  switch (action.type) {
    case constants.POST.SELECT:
      return Object.assign({}, state, {
        post: action.data
      })
    default:
      return state;
  }
}
