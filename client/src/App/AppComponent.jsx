import React from 'react';
import './App.css';
import axios from 'axios'

class App extends React.Component {

  componentDidMount() {
    const {getEvents} = this.props
    getEvents('Alan-James-Campbell', 'GitHub_Event_Finder')
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default App
