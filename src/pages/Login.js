/*
 * Author: David Shefcik
 * Created: 11/21/19
 * Project | File: Spotify Queue Client | src/pages/Login.js
 */

// Module imports
import React, { Component } from 'react'

// Component imports
import LoadingPage from '../components/LoadingPage'

// Component
class Login extends Component {
  render() {
    return (
      <div>
        <LoadingPage text="Redirecting you to Spotify"/>
      </div>
    )
  }
}

// Export
export default Login
