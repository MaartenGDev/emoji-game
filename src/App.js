import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import TeamPage from './containers/TeamPage'
import TeamTaskPage from './containers/TeamTaskPage'
import AdminPage from './containers/AdminPage'
import StatsPage from './containers/StatsPage'

class App extends Component {
  render () {
    return (
      <Router>
        <main className="App">
          <Switch>
            <Route exact path="/" component={TeamPage}/>
            <Route exact path="/groups/:id" component={TeamPage}/>
            <Route exact path="/groups/:id/tasks/:taskId" component={TeamTaskPage}/>
            <Route exact path="/admin" component={AdminPage}/>
            <Route exact path="/stats" component={StatsPage}/>
          </Switch>
        </main>
      </Router>
    )
  }
}

export default App
