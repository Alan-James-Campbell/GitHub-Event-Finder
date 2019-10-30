import React 			  from 'react'
import EventForm          from '../EventForm'
import                   './App.css'

const App = ({getEvents}) => {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Search For GitHub Events</h1>
        <EventForm/>
      </header>
    </div>
  )
  
}

export default App
