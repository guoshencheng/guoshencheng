export const fetchList = () => ({ apis, actions }) => {
  apis.allMockProjects().then(data => {
    actions.reducerActions.mockProject.FINISH_FETCH_MOCK_PROJECT({ data });
  }).catch(err => {
    console.log(err)
  })
}
