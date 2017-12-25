import axios from 'axios'
import cookie from 'cookie'

// axios config https://github.com/axios/axios#request-config
// const myApi = 'https://www.easy-mock.com/mock/58fff6e5739ac1685205acb1/data/'
// const token = cache.getItem('user_token')

const serializeHeaders = ctx => ({
  'User-Agent': ctx.req.headers['user-agent'],
  Token: ctx.req.headers.cookie ? cookie(ctx.req.headers.cookie).token : '',
})

// const proApi = 'http://jr.duduapp.net/api/'
// baseURL: ctx.isServer ? 'http://m.jrdudu.com/api/' : '/api/',
const callApi = (url, method, data, ctx = {}, options = {}) => {
  const opts = { ...options }
  if (ctx.isServer) {
    opts.headers = serializeHeaders(ctx)
  }
  return axios(Object.assign({}, {
    baseURL: 'http://jr.duduapp.net/api/',
    url,
    method,
    params: method === 'get' ? data : {}, // 添加在请求URL后面的参数
    data: method !== 'get' ? data : {}, // 适用于 PUT POST PATCH
    withCredentials: false, // 是否跨域
  }, opts)).then(data => data.data)
}

export default {
  callApi,
  get: (url, data = {}) => callApi(url, 'get', data),
  put: (url, data = {}) => callApi(url, 'put', data),
  post: (url, data = {}) => callApi(url, 'post', data),
  delete: (url, data = {}) => callApi(url, 'delete', data),
}
