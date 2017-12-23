import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import withRedux from 'next-redux-wrapper'
import apiMiddleware from './middleware/api'
import rootReducers from './reducers'

const composeEnhancers = compose // eslint-disable-line

// 产品模式
function configureStorePro(initialState) {
  const middlewares = [thunkMiddleware, apiMiddleware]
  const store = createStore(
    rootReducers,
    initialState,
    compose(applyMiddleware(...middlewares)),
  )
  return store
}

// 开发模式
function configureStoreDev(initialState) {
  const middlewares = [thunkMiddleware, apiMiddleware, logger]
  const store = createStore(
    rootReducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  )
  return store
}

const initStore = process.env.NODE_ENV === 'production' ? configureStorePro : configureStoreDev

// export default com => withRedux(initStore)(com)

export default initStore
