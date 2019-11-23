/*
 * Author: David Shefcik
 * Created: 11/21/19
 * Project | File: Spotify Queue Client | src/pages/Callback.js
 */

// Module imports
import React, { Component } from 'react'
import axiosConfig from '../modules/axiosConfig'
import queryString from 'query-string'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Redux imports
import { setUser } from '../modules/redux/actions/userActions'
import { setToken } from '../modules/redux/actions/tokenActions'

// Component imports
import LoadingPage from '../components/LoadingPage'

// Component
class CallbackPage extends Component {
  componentDidMount() {
    axiosConfig
      .post('/auth/callback', {
        code: queryString.parse(this.props.location.search).code
      })
      .then(res => {
        this.props.setUser(res['data']['user']['username'])
        this.props.setToken(res['data']['user']['token'])
        this.props.history.push('/')
      })
      .catch(error => {
        if (process.env.PRODUCTION === 'false') {
          console.log(error)
        }
        this.props.history.push('/error')
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

// Prop types
CallbackPage.propTypes = {
  setToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
}

// Export
export default connect(null, { setToken, setUser })(CallbackPage)
