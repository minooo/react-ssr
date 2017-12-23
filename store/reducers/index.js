import { combineReducers } from 'redux'
import fetchOnce from './0-01-fetchOnce'
import home from './1-01-home'
// import hotSearch from './1-02-hotSearch'
// import mySearch from './1-03-mySearch'
// import loansFilter from './2-01-loansFilter'
// import cardsHome from './3-01-cardsHome'
// import cardsFilter from './3-02-cardsFilter'
// import user from './4-01-user'

export default combineReducers({
  fetchOnce,
  home,
  // hotSearch,
  // mySearch,
  // loansFilter,
  // cardsHome,
  // cardsFilter,
  // user,
})
