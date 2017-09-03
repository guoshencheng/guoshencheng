import constants from '../constants';

const defaultValue = {
  post: {},
  loading: false
}

export default (state = defaultValue, action) => {
  switch (action.type) {
    case constants.POST.FINISH_CHANGE_STATUS:
      return Object.assign({}, state, {
        post: action.data
      })
    case constants.POST.SELECT:
      return Object.assign({}, state, {
        post: action.data
      })
    case constants.POST.UPDATE_VALUE:
      return Object.assign({}, state, {
        post: Object.assign({}, state.post, {
          [action.key]: action.value
        })
      })
    case constants.POST.FINISH_SAVE_POST:
      return Object.assign({}, state, {
        post: action.data
      })
    default:
      return state;
  }
}
