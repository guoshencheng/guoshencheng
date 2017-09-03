export const methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
}

const apis = {
  creatEmpty: {
    path: '/api/v1/posts/empty',
    method: methods.POST
  },
  allPosts: {
    path: '/api/v1/posts',
    method: methods.GET
  },
  postById: {
    path: (params) => {
      return `/api/v1/posts/${params.id}`
    },
    method: methods.GET
  }
}

export const keys = Object.keys(apis).reduce((pre, key) => {
  pre[key] = key
  return pre;
}, {})

export default apis
