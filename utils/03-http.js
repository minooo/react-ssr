import axios from 'axios'
// axios config https://github.com/axios/axios#request-config
// const myApi = 'https://www.easy-mock.com/mock/58fff6e5739ac1685205acb1/data/'

// 'http://jr.duduapp.net/api/' : 'http://192.168.1.116/api/'
const pro = process.env.NODE_ENV === 'production'
const test = process.env.NODE_TEST === 'test'

const callApi = (url, method, data, isServer = false, options = {}) => {
  const opts = { ...options }
  return axios(Object.assign({}, {
    baseURL: isServer ? ((pro && !test) ? 'http://jr.duduapp.net/api/' : 'http://jr.duduapp.net/api/') : '/api/',
    url,
    method,
    params: method === 'get' ? data : {}, // 添加在请求URL后面的参数
    data: method !== 'get' ? data : {}, // 适用于 PUT POST PATCH
    withCredentials: true, // 请求时是否携带cookie
  }, opts)).then(data => data.data)
}

export default {
  callApi,
  get: (url, data = {}, isServer) => callApi(url, 'get', data, isServer),
  put: (url, data = {}, isServer) => callApi(url, 'put', data, isServer),
  post: (url, data = {}, isServer) => callApi(url, 'post', data, isServer),
  delete: (url, data = {}, isServer) => callApi(url, 'delete', data, isServer),
}
