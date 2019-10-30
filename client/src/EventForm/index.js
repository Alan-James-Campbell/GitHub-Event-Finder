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
  const eventTypes = eventList.length > 0 ? eventList.map(event => event.type).filter(onlyUnique) : []
  const initialValues = Object.assign(
    {},
    (userName ? {userName} : {}),
    (repoName ? {repoName} : {}),
    (createEventTypeObject(eventTypes))
  )
  eventList = eventList.filter(event => (Object.keys(initialValues).includes(event.type)) && (initialValues[event.type] === true))
  
  return {
    userName,
    repoName,
    eventList,
    eventTypes,
    initialValues
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
