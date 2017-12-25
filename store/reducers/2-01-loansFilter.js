import { LOANS_FILTER } from '@actions'
import { addDefault } from '@utils'

const TITLE = [{ title: '综合排序', key: 'sort' }, { title: '全部类型', key: 'type' }, { title: '不限额度', key: 'limit' }]


export default (state = null, action) => {
  switch (action.type) {
    case LOANS_FILTER:
      return {
        ...state,
        currentTitle: TITLE,
        selectList: addDefault(TITLE, action.payload.selectList),
      }
    default:
      return state
  }
}
