import { CALL_API } from '@utils'

// 异步动作生成函数
const requestTypes = ['_REQUEST', '_SUCCESS', '_FAIL']
function createRequestTypes(base) {
  return requestTypes.map(item => base + item)
}

// 请求一次
export const FETCH_ONCE = 'FETCH_ONCE'
export const fetchOnce = () => ({
  type: FETCH_ONCE,
})

// 首页
// 获取首页数据
export const HOME = 'HOME'
export const getHome = payload => ({
  type: HOME,
  payload,
})

// 获取热门搜索
export const HOT_SEARCH = 'HOT_SEARCH'
export const getHotSearch = payload => ({
  type: HOT_SEARCH,
  payload,
})

// 本地获取我的近期搜索
export const GET_MY_SEARCH = 'GET_MY_SEARCH'
export const getMySearch = payload => ({
  type: GET_MY_SEARCH,
  payload,
})

// 贷款
// 贷款过滤条件
export const LOANS_FILTER = 'LOANS_FILTER'
export const getLoansFilter = payload => ({
  type: LOANS_FILTER,
  payload,
})

// 信用卡
// 信用卡首页数据
export const CARDS_HOME = 'CARDS_HOME'
export const getCardsHome = payload => ({
  type: CARDS_HOME,
  payload,
})

// 信用卡过滤条件
export const CARDS_FILTER = 'CARDS_FILTER'
export const getCardsFilter = payload => ({
  type: CARDS_FILTER,
  payload,
})

// 个人中心
// 获取用户信息
export const USER = 'USER'
export const getUser = payload => ({
  type: USER,
  payload,
})

// 退出登陆
export const LOGOUT = 'LOGOUT'
export const getOut = () => ({ type: LOGOUT })

// 模板
// export const EXAMPLE = createRequestTypes('EXAMPLE')
// export const getExample = (id) => ({
//   [CALL_API]: {
//     types: EXAMPLE,
//     endpoint: `loans_filter`,
//     params: { id }， // 可选
//     method: 'put', // 可选，默认get
//     toast: ['处理中', '处理成功', '处理失败'], // 可选
//     options: { headers: { Authorization: `Bearer ${token}` } } // 可选
//   },
// })
