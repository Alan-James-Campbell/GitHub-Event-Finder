import React 		from 'react'
import { Field }    from 'redux-form'
import { Button }   from 'react-bootstrap'
import       		'./EventForm.css'


const EventForm = ({eventList, eventTypes, getEvents, userName, repoName, valid, initialValues}) => {
  console.log('eventList', eventList)
  console.log('EventTypes', eventTypes)
  //   Alan-James-Campbell    'GitHub-Event-Finder'   


  return (
    <div className=''>
      <form onSubmit={e => getEvents(e, userName, repoName)}>
        <Field 
          name="userName" 
          label='User Name'
          component={renderField}
          //todo: add validations
        />
          
        <Field 
          name="repoName" 
          label='Repo Name'
          component={renderField}
          //todo: add validations
        />

        {(eventTypes.length > 0)&&(
          eventTypes.map((type, idx) => {
          	return (
          	  <div className='eventTypeCheckBoxes' key={idx}>	
	            <label>{type}</label>	
	            <Field name={type} component={renderField} type='checkbox' defaultChecked={true}/>
              </div>
          	)
          })
        )}

        <Button
          block
          disabled={!valid}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  )
  
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div >
    <input className=''{...input} placeholder={label} type={type}/>  
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)

export default EventForm
