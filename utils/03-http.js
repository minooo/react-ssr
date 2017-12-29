import axios from 'axios'
// axios config https://github.com/axios/axios#request-config
// const myApi = 'https://www.easy-mock.com/mock/58fff6e5739ac1685205acb1/data/'
// const token = cache.getItem('user_token')

// const serializeHeaders = ctx => ({
//   'User-Agent': ctx.req.headers['user-agent'],
//   ...(cookie.parse(ctx.req.headers.cookie || '').userToken && { Token: cookie.parse(ctx.req.headers.cookie).userToken }),
// })

// const proApi = 'http://jr.duduapp.net/api/'
// baseURL: ctx.isServer ? 'http://m.jrdudu.com/api/' : '/api/',
const dev = process.env.NODE_ENV !== 'production'
const baseURL = dev ? 'http://m.jrdudu.com/api/' : 'http://jr.duduapp.net/api/'
const callApi = (url, method, data, options = {}) => {
  const opts = { ...options }
  return axios(Object.assign({}, {
    baseURL,
    url,
    method,
    params: method === 'get' ? data : {}, // 添加在请求URL后面的参数
    data: method !== 'get' ? data : {}, // 适用于 PUT POST PATCH
    withCredentials: true, // 请求时是否携带cookie
  }, opts)).then(data => data.data)
}

export default {
  callApi,
  get: (url, data = {}) => callApi(url, 'get', data),
  put: (url, data = {}) => callApi(url, 'put', data),
  post: (url, data = {}) => callApi(url, 'post', data),
  delete: (url, data = {}) => callApi(url, 'delete', data),
}
