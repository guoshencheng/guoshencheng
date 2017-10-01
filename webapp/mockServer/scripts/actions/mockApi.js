export const fetchList = (projectId) => ({ apis, actions }) => {
  apis.allMockApis({ projectId }).then(data => {
    actions.reducerActions.mockApi.FINISH_FETCH_MOCK_API({ data });
  }).catch(err => {
    console.log(err)
  });
}
