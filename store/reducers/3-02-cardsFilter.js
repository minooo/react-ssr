import { CARDS_FILTER } from '@actions'

export default (state = null, action) => {
  switch (action.type) {
    case CARDS_FILTER:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
