import { handleResponse, catchError } from '../utils/response.js';
import { is } from '../utils';
import axios from 'axios';
import apis from './apis.js';

export default (path, data, method, options) => {
  method = apis[path] ? apis[path].method : method;
  let url = apis[path] ? apis[path].path : path;
  if (is.fn(url)) url = url(data);
  let params = Object.assign({}, {
    method, url,
    params: method == "GET" || method == "DELETE" ? data : void 6,
    data: method == "PUT" || method == "POST" ? data : void 6
  }, options)
  return axios(params).then(handleResponse).catch(catchError)
}
