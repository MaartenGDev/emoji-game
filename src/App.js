import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import TeamPage from './containers/TeamPage'

class App extends Component {
  render () {
    return (
      <Router>
        <main className="App">
          <Switch>
            <Route exact path="/" component={TeamPage}/>
          </Switch>
        </main>
      </Router>
    )
  }
}

export default App
