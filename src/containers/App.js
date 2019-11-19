/*
 * Author: David Shefcik
 * Created: 11/18/19
 * Project | File: Spotify Queue Client | src/containers/index.js
 */

// Module imports
import { hot } from 'react-hot-loader'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// CSS imports
import './css/App.css'

// Page imports
import Home from '../pages/Home/index'

// Component
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routes: [
        {
          key: 'home',
          path: '/',
          component: <Home />
        }
      ]
    }
  }
  render() {
    return (
      <Router>
        <Switch>
          {this.state.routes.map(value => {
            return (
              <Route path={value.path} key={value.key}>
                {value.component}
              </Route>
            )
          })}
        </Switch>
      </Router>
    )
  }
}

// Export
export default hot(module)(App)
