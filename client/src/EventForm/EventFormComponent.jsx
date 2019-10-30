import React 		    from 'react'
import { Field }    from 'redux-form'
import ReactTable   from 'react-table'
import { Button }   from 'react-bootstrap'
import { notEmpty } from './eventValidations'
import              'react-table/react-table.css'
import       		    './EventForm.css'

const EventForm = ({eventList, eventTypes, disableSubmit, submitError, getEvents, updateSubmitError, userName, repoName, valid, initialValues, isLoading}) => {

  return (
    <div className='eventForm'>
      <form onSubmit={e => getEvents(e, userName, repoName)}>
        
        <label>User Name</label>
        <Field
          name="userName" 
          label='User Name'
          component={renderField}
          onFocus={e => submitError ? updateSubmitError('') : null }
          validate={[notEmpty]}
        />
      
        <label>Repo Name</label>
        <Field 
          name="repoName" 
          label='Repo Name'
          component={renderField}
          onFocus={e => submitError ? updateSubmitError('') : null }
          validate={[notEmpty]}
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
        
        <div>
          <Button
            disabled={disableSubmit  || !valid}
            type="submit"
          >
            {isLoading ? (
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
             ) : (
              <div>
                Submit
              </div>
            )}
            
          </Button>
        </div>     

      </form>

      {submitError&&(
        <div className='submitAlert'>
          <div className="alert alert-danger" role="alert">
            {submitError}
          </div>
        </div>
      )}

      {(eventList.length > 0)&&(
        <div>
          <ReactTable
            style={{'width':'100%', 'margin':'20px 0', 'backgroundColor':'white', 'color':'black'}}
            data={eventList}
            filterable
            columns={[
              {
                columns: [
                  {
                    Header: 'Event Type',
                    accessor: 'type',
                    style: {'fontSize': '12px'},
                    sortMethod: (a, b) => {if (a === b) {return 0; } return a > b ? 1 : -1; }, 
                    filterMethod: (filter, row) => row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
                  },                 
                  {
                    Header: 'User Name',
                    accessor: 'actor.display_login',
                    style: {'fontSize': '12px'},
                    sortable: false,
                    filterable: false
                    //user information is uniform and does not need sort or filter options           
                  },                      
                  {
                    Header: 'User Id',
                    accessor: 'actor.id',
                    style: {'fontSize': '12px'},
                    sortable: false,
                    filterable: false,
                    //user information is uniform and does not need sort or filter options           
                  },
                  {
                    Header: 'TimeStamp',
                    accessor: 'created_at',
                    style: {'fontSize': '12px'},
                    sortMethod: (a, b) => {
                      const a1 = new Date(a)
                      const b1 = new Date(b)
                      if (a1 === b1) {return 0; } return a1 > b1 ? 1 : -1;
                    }
                  },              

                ]
              }
            ]}
            defaultPageSize={10}
            defaultSorted={[{ id: 'event', desc: true } ]} 
            className="-striped -highlight"
          />
          
          <div style={{ textAlign: "center" }}>
            <em>Tip: Type in boxes to filter content!</em><br/>
            <em>Tip: Hold shift when sorting to multi-sort!</em>
          </div>

        </div>
      )}

    </div>
  ) 
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div >
    <input className='eventFormInputs'{...input} placeholder={label} type={type}/>  
    {touched && (error && <div className='eventFormErrors'><small style={{'color':'red'}}>{error}</small></div>)}
  </div>
)

export default EventForm
