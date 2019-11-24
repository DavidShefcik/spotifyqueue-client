/*
 * Author: David Shefcik
 * Created: 11/18/19
 * Project | File: Spotify Queue Client | src/containers/index.js
 */

// Module imports
import { hot } from 'react-hot-loader'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// CSS imports
import styles from './css/App.css'

// Page imports
import Home from '../pages/Home/index'
import Login from '../pages/Login'
import Callback from '../pages/Callback'
import Logout from '../pages/Logout'
import Queue from '../pages/Queue'

// Component imports
import Footer from '../components/Footer'
import LoadingPage from '../components/LoadingPage'

// Redux imports
import reduxStore from '../modules/redux'

// Component
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routes: [
        {
          key: 'queue',
          path: '/queue',
          component: Queue
        },
        {
          key: 'logout',
          path: '/logout',
          component: Logout
        },
        {
          key: 'callback',
          path: '/callback',
          component: Callback
        },
        {
          key: 'login',
          path: '/login',
          component: Login
        },
        {
          key: 'home',
          path: '/',
          component: Home
        }
      ]
    }
  }
  render() {
    return (
      <Provider store={reduxStore().store}>
        <PersistGate
          loading={<LoadingPage text="Please wait" />}
          persistor={reduxStore().persistor}
        >
          <Router>
            <Switch>
              {this.state.routes.map(value => {
                return (
                  <Route
                    path={value.path}
                    className={styles.page}
                    key={value.key}
                    component={value.component}
                  />
                )
              })}
            </Switch>
            <Footer />
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}

// Export
export default hot(module)(App)
