/*
 * Author: David Shefcik
 * Created: 11/21/19
 * Project | File: Spotify Queue Client | src/pages/Callback.js
 */

// Module imports
import React, { Component } from 'react'
import axiosConfig from '../modules/axiosConfig'

// Component imports
import LoadingPage from '../components/LoadingPage'

// Component
class CallbackPage extends Component {
  componentDidMount() {
    axiosConfig
      .post('/auth/callback', { code: this.props.location.query.code })
      .then(res => {
        console.log(res['data'])
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
        <LoadingPage text="Please wait" />
      </div>
    )
  }
}

// Export
export default CallbackPage
