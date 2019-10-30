import EventFormComponent   from './EventFormComponent'
import {connect}     		from 'react-redux'
import { reduxForm }        from 'redux-form'
import _                    from 'lodash'
import {fetchEvents} 		from '../reducers/events'

const mapStateToProps = state => {
 
  const onlyUnique = (value, index, self) => self.indexOf(value) === index
  
  const createEventTypeObject = eventTypes => {
  	const eventTypeObject = {}
  	eventTypes.forEach(event => {
  	  const bool = _.get(state, `form.EventForm.values.${event}`, false)
      eventTypeObject[event] = bool
  	})
  	return eventTypeObject
  }

  const userName = _.get(state, 'form.EventForm.values.userName', '')
  const repoName = _.get(state, 'form.EventForm.values.repoName', '')
  let eventList   = _.get(state, 'events.eventList', [])
  let eventTypes = eventList.length > 0 ? eventList.map(event => event.type).filter(onlyUnique) : []
  const initialValues = Object.assign(
    {},
    (userName ? {userName} : {}),
    (repoName ? {repoName} : {}),
    (createEventTypeObject(eventTypes))
  )
  const {lastSubmittedUserName, lastSubmittedRepoName, hasSubmitted} = state.events
  const hasChangedAfterSubmission = (hasSubmitted) && ((lastSubmittedUserName !== userName || lastSubmittedRepoName !== repoName))
  eventList = eventList.filter(event => (Object.keys(initialValues).includes(event.type)) && (initialValues[event.type] === true))
  const disableSubmit = (hasSubmitted && !hasChangedAfterSubmission)
  eventTypes = disableSubmit ? eventTypes : []
  eventList = disableSubmit ? eventList : []
  
  return {
    userName,
    repoName,
    eventList,
    eventTypes,
    initialValues,
    disableSubmit
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    getEvents(e, userName, repoName) {
      e.preventDefault()
      dispatch(fetchEvents(userName, repoName))
    }
  }
}

const EventForm = reduxForm({
  form: 'EventForm',
  enableReinitialize: true,
})(EventFormComponent)

export default connect(mapStateToProps, mapDispatchToProps)(EventForm)
