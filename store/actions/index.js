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
export const HOME = createRequestTypes('HOME')
export const getHome = ctx => ({
  [CALL_API]: {
    types: HOME,
    endpoint: 'home',
    ctx,
  },
})
// 获取热门搜索
export const HOT_SEARCH = createRequestTypes('HOT_SEARCH')
export const getHotSearch = () => ({
  [CALL_API]: {
    types: HOT_SEARCH,
    endpoint: 'search',
  },
})
// 本地获取我的近期搜索
export const GET_MY_SEARCH = 'GET_MY_SEARCH'
export const getMySearch = cacheSearchList => ({
  type: GET_MY_SEARCH,
  cacheSearchList,
})

// 贷款
// 贷款过滤条件
export const LOANS_FILTER = createRequestTypes('LOANS_FILTER')
export const getLoansFilter = () => ({
  [CALL_API]: {
    types: LOANS_FILTER,
    endpoint: 'loans_filter',
  },
})

// 信用卡
// 信用卡首页数据
export const CARDS_HOME = createRequestTypes('CARDS_HOME')
export const getCardsHome = () => ({
  [CALL_API]: {
    types: CARDS_HOME,
    endpoint: 'cards',
  },
})
// 信用卡过滤条件
export const CARDS_FILTER = createRequestTypes('CARDS_FILTER')
export const getCardsFilter = () => ({
  [CALL_API]: {
    types: CARDS_FILTER,
    endpoint: 'cards_filter',
  },
})

// 个人中心
// 获取用户信息
export const USER = createRequestTypes('USER')
export const getUser = token => ({
  [CALL_API]: {
    types: USER,
    endpoint: 'user_info',
    params: { token },
  },
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
