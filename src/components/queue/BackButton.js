/*
 * Author: David Shefcik
 * Created: 11/27/19
 * Project | File: Spotify Queue Client | src/components/queue/BackButton.js
 */

// Module imports
import React, { Component } from 'react'
import axiosConfig from '../../modules/axiosConfig'
import { connect } from 'react-redux'

// CSS imports
import styles from './css/SongController.css'

// Component
class BackButton extends Component {
  render() {
    return (
      <div className={styles.container}>
        <p>Back</p>
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

// Export
export default connect(mapStateToProps)(BackButton)
