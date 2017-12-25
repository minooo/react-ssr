import { CARDS_HOME } from '@actions'

export default (state = null, action) => {
  switch (action.type) {
    case CARDS_HOME:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
