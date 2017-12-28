import { GET_MY_SEARCH } from '@actions'

export default (state = [], action) => {
  switch (action.type) {
    case GET_MY_SEARCH:
      return [...(action.payload.length > 0 && action.payload)]
    default:
      return state
  }
}
