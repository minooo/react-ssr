import { USER, LOGOUT } from '@actions'

export default (state = null, action) => {
  switch (action.type) {
    case USER:
      return {
        ...state,
        ...action.payload,
      }
    case LOGOUT:
      return null
    default:
      return state
  }
}
