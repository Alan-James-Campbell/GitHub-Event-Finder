import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const UPDATE_EVENTS = 'UPDATE_EVENTS'
const UPDATE_LAST_SUBMITTED_PARAMS = 'UPDATE_LAST_SUBMITTED_PARAMS'

/* ------------   ACTION CREATORS     ------------------ */

const updateEvents = events => ({type: UPDATE_EVENTS, events})
const updateLastSubmittedParams = (userName, repoName, hasSubmitted) => ({type: UPDATE_LAST_SUBMITTED_PARAMS, userName, repoName, hasSubmitted})

/* ------------       REDUCER     ------------------ */

const initState = {
  eventList: [],
  hasSubmitted: false,
  lastSubmittedUserName: '',
  lastSubmittedRepoName: '',
}

export const reducer = (state = initState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type){

    case UPDATE_EVENTS:
	  newState.eventList = action.events
	  break    

	case UPDATE_LAST_SUBMITTED_PARAMS:
	  const { userName, repoName, hasSubmitted }   = action
	  newState.lastSubmittedUserName =  userName
	  newState.lastSubmittedRepoName =  repoName
	  newState.hasSubmitted	         =  hasSubmitted

	  break

	default:
	  return state;
  }
return newState;
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchEvents = (userName, repoName) => dispatch => {
  axios.get(`/api/getEvents/${userName}/${repoName}`)
  .then(response => {
  	const data = response.data
  	dispatch(updateEvents(data))
  	dispatch(updateLastSubmittedParams(userName, repoName, true))
  })
  .catch(err => {
  	dispatch(updateEvents([]))
  	dispatch(updateLastSubmittedParams('', '', false))
  	console.log('error: ' + err)
  })
}

export default reducer
