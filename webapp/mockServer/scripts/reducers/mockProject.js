
export default {
  reducers: {
    FINISH_FETCH_MOCK_PROJECT: (state, action) => Object.assign({}, state, { list: action.data })
  },
  defaultState: {
    list: []
  }
}
