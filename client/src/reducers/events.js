import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const UPDATE_EVENTS                = 'UPDATE_EVENTS'
const UPDATE_LAST_SUBMITTED_PARAMS = 'UPDATE_LAST_SUBMITTED_PARAMS'
const UPDATE_SUBMIT_ERROR          = 'UPDATE_SUBMIT_ERROR'
const UPDATE_IS_LOADING            = 'UPDATE_IS_LOADING'

/* ------------   ACTION CREATORS     ------------------ */

const updateEvents    = events => ({type: UPDATE_EVENTS, events})
const updateIsLoading = isLoading => ({type: UPDATE_IS_LOADING, isLoading})
const updateLastSubmittedParams = (userName, repoName, hasSubmitted) => ({type: UPDATE_LAST_SUBMITTED_PARAMS, userName, repoName, hasSubmitted})
export const updateSubmitError  = error => ({type: UPDATE_SUBMIT_ERROR, error})

/* ------------       REDUCER     ------------------ */

const initState = {
  eventList: [],
  hasSubmitted: false,
  lastSubmittedUserName: '',
  lastSubmittedRepoName: '',
  submitError: '',
  isLoading: false
}

export const reducer = (state = initState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type){

    case UPDATE_EVENTS:
	    newState.eventList = action.events
	    break    

	  case UPDATE_LAST_SUBMITTED_PARAMS:
	    const { userName, repoName, hasSubmitted }   = action
	    newState.lastSubmittedUserName               =  userName
	    newState.lastSubmittedRepoName               =  repoName
	    newState.hasSubmitted	                       =  hasSubmitted
      break

    case UPDATE_IS_LOADING:
      newState.isLoading = action.isLoading
      break     

    case UPDATE_SUBMIT_ERROR:
      newState.submitError = action.error.toString()
      break  

    default:
	    return state
  }
  return newState
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchEvents = (userName, repoName) => dispatch => {
  dispatch(updateIsLoading(true))
  axios.get(`/api/getEvents/${userName}/${repoName}`)
  .then(response => {
  	const data = response.data
  	dispatch(updateEvents(data))
  	dispatch(updateLastSubmittedParams(userName, repoName, true))
    dispatch(updateIsLoading(false))
  })
  .catch(err => {
  	dispatch(updateEvents([]))
  	dispatch(updateLastSubmittedParams('', '', false))
    dispatch(updateSubmitError(err))
    dispatch(updateIsLoading(false))
  })
}

export default reducer
