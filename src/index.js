import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, Switch} from 'react-router-dom'
import ReactGA from 'react-ga'
import { createBrowserHistory } from 'history'
import Create from './pages/Create'
import Copy from './pages/Copy'
import NotFound from './pages/NotFound'

ReactGA.initialize('UA-114499308-2')
ReactGA.pageview(window.location.pathname + window.location.search)

const history = createBrowserHistory()

history.listen((location) => {
  ReactGA.pageview(location.pathname + location.search)
})

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Create}/>
        <Route exact path="/:base64" component={Copy}/>
        <Route exact path="*" component={NotFound}/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
