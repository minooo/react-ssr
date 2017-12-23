import { FETCH_ONCE } from '@actions'

export default (state = false, action) => {
  switch (action.type) {
    case FETCH_ONCE:
      return true
    default:
      return state
  }
}
