import React       from 'react'
import { shallow } from 'enzyme'
import toJson      from 'enzyme-to-json'
import EventForm from './EventFormComponent'
import { Field }    from 'redux-form'

    
describe('EventForm', () => {
	const props = {
      eventList: [],
	  eventTypes: [],
	  disableSubmit: false, 
	  submitError: '', 
	  getEvents: function(){},
	  updateSubmitError: function(){},
	  userName: '',
	  repoName: '',
	  valid: true,
	  initialValues: {},
	  isLoading: false
    }

    it('renders without crashing given the required props', () => {
      const wrapper = shallow(<EventForm {...props} />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('does not render Event Type checkboxes when eventType list is empty', () => {
      const wrapper = shallow(<EventForm {...props} />)
      expect(wrapper.contains(<div className='unique' />)).toEqual(false)
    })    

    it('renders Event Type checkboxes when eventType list is populated', () => {
      const newProps = Object.assign({}, props, {eventTypes: ['PushEvent', 'CreateEvent']})
      const wrapper = shallow(<EventForm {...newProps} />)
      expect(wrapper.contains(<div className='checkBoxes' />)).toEqual(true)
    })
})