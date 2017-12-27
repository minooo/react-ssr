import { CARDS_FILTER } from '@actions'
import { addDefault } from '@utils'

const TITLE = [{ title: '全部银行', key: 'bank' }, { title: '所有卡型', key: 'use' }, { title: '不限等级', key: 'level' }]

export default (state = null, action) => {
  switch (action.type) {
    case CARDS_FILTER:
      return {
        ...state,
        currentTitle: TITLE,
        selectList: addDefault(TITLE, action.payload.selectList),
      }
    default:
      return state
  }
}
