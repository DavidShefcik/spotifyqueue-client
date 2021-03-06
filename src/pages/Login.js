/*
 * Author: David Shefcik
 * Created: 11/21/19
 * Project | File: Spotify Queue Client | src/pages/Login.js
 */

// Module imports
import React, { Component } from 'react'
import axiosConfig from '../modules/axiosConfig'

// Component imports
import LoadingPage from '../components/LoadingPage'

// Component
class Login extends Component {
  componentDidMount() {
    axiosConfig
      .get('/auth/login')
      .then(res => {
        window.location.href = res['data']['url']
      })
      .catch(error => {
        if (process.env.PRODUCTION === 'false') {
          console.log(error)
        }
        this.context.router.history.push('/error')
      })
  }
  render() {
    return (
      <div>
        <LoadingPage text="Redirecting you to Spotify" />
      </div>
    )
  }
}

// Export
export default Login
