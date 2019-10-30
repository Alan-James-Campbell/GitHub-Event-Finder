import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const UPDATE_EVENTS = 'UPDATE_EVENTS'

/* ------------   ACTION CREATORS     ------------------ */

const updateEvents = events => ({type: UPDATE_EVENTS, events})
/* ------------       REDUCER     ------------------ */

const initState = {
	events: []
}

export const reducer = (state = initState, action) => {
	const newState = Object.assign({}, state)
	switch (action.type){

		case UPDATE_EVENTS:
			newState.events = action.events
			break;


		default:
			return state;
	}
	return newState;
}
/* ------------       DISPATCHERS     ------------------ */
export const fetchEvents = (userName, repoName) => dispatch => {
  axios.get(`/api/getEvents/${userName}/${repoName}`)
  .then(response => dispatch(updateEvents(response.data)))
  .catch(err => console.log('error: ' + err))
}

export default reducer
