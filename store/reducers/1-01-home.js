import { HOME } from '@actions'

const [REQUEST, SUCCESS, FAIL] = HOME

export default (state = { isFetchSuccess: false }, action) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        isFetchSuccess: false,
      }
    case SUCCESS:
      return {
        ...state,
        ...action.response,
        isFetchSuccess: true,
      }
    case FAIL:
      return {
        ...state,
        err: action.err,
        isFetchSuccess: false,
      }
    default:
      return state
  }
}
