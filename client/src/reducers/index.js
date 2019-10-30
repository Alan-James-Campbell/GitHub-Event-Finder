import {combineReducers} 			from 'redux'
import {reducer as formReducer} 	from 'redux-form'

const rootReducer = combineReducers({
  events: require('./events').default,
  form:   formReducer
})

export default rootReducer
