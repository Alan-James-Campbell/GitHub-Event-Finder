import { combineReducers } from 'redux'
// import { reducer as form } from 'redux-form'

const rootReducer = combineReducers({
  events: require('./events').default,
})

export default rootReducer
