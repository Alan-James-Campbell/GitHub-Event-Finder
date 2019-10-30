import React 		from 'react'
import { Field }    from 'redux-form'
import { Button }   from 'react-bootstrap'
import       		'./EventForm.css'


const EventForm = ({eventList, eventTypes, disableSubmit, getEvents, userName, repoName, valid, initialValues}) => {
  console.log('eventList', eventList)
  console.log('disableSubmit', disableSubmit)
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
          disabled={disableSubmit}
          type="submit"
        >
          Submit
        </Button>        

      </form>
      {(eventList.length > 0)&&(
          eventList.map((event, idx) => {
            return (
              <div key={idx}> 
                <h3>{event.repo.name}</h3>
              </div>
            )
          })
        )}
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
