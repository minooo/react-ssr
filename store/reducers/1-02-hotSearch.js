import { HOT_SEARCH } from '@actions'

export default (state = null, action) => {
  switch (action.type) {
    case HOT_SEARCH:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
