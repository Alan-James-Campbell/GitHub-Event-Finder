import AppComponent  from './AppComponent'
import {connect}     from 'react-redux'
import {fetchEvents} from '../reducers/events'

const mapStateToProps = state => {
  console.log('state', state)
  return {
  
  }
}

const mapDisptachToProps = (dispatch,ownProps) => {
  return {
     getEvents(userName, repoName) {
       dispatch(fetchEvents(userName, repoName))
    }

  }
}

export default connect(mapStateToProps, mapDisptachToProps )(AppComponent)
