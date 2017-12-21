import axios from 'axios'

// axios config https://github.com/axios/axios#request-config
// const myApi = 'https://www.easy-mock.com/mock/58fff6e5739ac1685205acb1/data/'
const devApi = 'http://192.168.1.50/api/'
const proApi = 'http://jr.duduapp.net/api/'

const callApi = (url, method, data, options = {}) => axios(Object.assign({}, {
  baseURL: '/api/',
  url,
  method,
  params: method === 'get' ? data : {}, // 添加在请求URL后面的参数
  data: method !== 'get' ? data : {}, // 适用于 PUT POST PATCH
  withCredentials: false, // 是否跨域
}, options)).then(data => data.data)

export default {
  callApi,
  get: (url, data = {}, options = {}) => callApi(url, 'get', data, options),
  put: (url, data = {}, options = {}) => callApi(url, 'put', data, options),
  post: (url, data = {}, options = {}) => callApi(url, 'post', data, options),
  delete: (url, data = {}, options = {}) => callApi(url, 'delete', data, options),
}
