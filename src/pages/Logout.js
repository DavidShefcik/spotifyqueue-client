/*
 * Author: David Shefcik
 * Created: 11/23/19
 * Project | File: Spotify Queue Client | src/pages/Logout.js
 */

// Module imports
import React, { Component } from 'react'
import axiosConfig from '../modules/axiosConfig'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Redux imports
import { removeUser } from '../modules/redux/actions/userActions'
import { removeToken } from '../modules/redux/actions/tokenActions'

// Component imports
import LoadingPage from '../components/LoadingPage'

// Component
class Logout extends Component {
  componentDidMount() {
    axiosConfig
      .post('/auth/logout', {
        token: this.props.token
      })
      .then(res => {
        this.props.removeUser()
        this.props.removeToken()
        this.props.history.push('/')
      })
      .catch(error => {
        if (process.env.PRODUCTION === 'false') {
          console.log(error)
        }
        this.props.removeUser()
        this.props.removeToken()
        this.props.history.push('/')
        this.props.history.push('/error')
      })
  }
  render() {
    return (
      <div>
        <LoadingPage text="Logging you out" />
      </div>
    )
  }
}

// Map state to props
const mapStateToProps = state => {
  return {
    token: state.token.token
  }
}

// Prop types
Logout.propTypes = {
  removeToken: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired
}

// Export
export default connect(mapStateToProps, { removeToken, removeUser })(Logout)
