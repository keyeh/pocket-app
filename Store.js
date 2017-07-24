import { compose, createStore, applyMiddleware } from "redux"
// import { autoRehydrate } from 'redux-persist'
import ReduxThunk from "redux-thunk"
import logger from 'redux-logger'
import devToolsEnhancer from "remote-redux-devtools"
import rootReducer from "./reducers"

const Store = createStore(
  rootReducer,
  devToolsEnhancer(),
  compose(
    // autoRehydrate({ log: true }),
    applyMiddleware(ReduxThunk, logger)
  )
)

export default Store
