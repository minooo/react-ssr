import { Toast } from 'antd-mobile'
import { CALL_API, http } from '@utils'

export default store => next => (action) => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  // 注意，总共五个参数
  let { endpoint } = callAPI
  const {
    types, params, method = 'get', options,
  } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }
  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }
  const [requestType, successType, failureType] = types
  // 开始请求
  next(actionWith({ type: requestType }))
  // 异步处理
  return http.callApi(endpoint, method, params, options).then((response) => {
    // 根据我司数据接口特点特此改造
    if (response.code === 200 && response.success) {
      next(actionWith({
        type: successType,
        response: response.data,
      }))
    } else {
      next(actionWith({
        type: failureType,
        err: response.msg || '请求错误',
      }))
    }
  }).catch((err) => {
    Toast.offline(`抱歉，网络错误，请稍后再试！${err}`)
    next(actionWith({
      type: failureType,
      err,
    }))
  })
}
