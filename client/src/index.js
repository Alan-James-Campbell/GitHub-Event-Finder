import React 			 from 'react'
import {render} 		 from 'react-dom'
import {Provider} 		 from 'react-redux'
import store			 from './store'
import App 				 from './App'
import 					 './index.css'
import {Router, 
	    Route, 
	    browserHistory} from 'react-router'

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

