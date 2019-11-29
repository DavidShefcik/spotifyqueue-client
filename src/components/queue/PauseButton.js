/*
 * Author: David Shefcik
 * Created: 11/27/19
 * Project | File: Spotify Queue Client | src/components/queue/PauseButton.js
 */

// Module imports
import React, { Component } from 'react'
import axiosConfig from '../../modules/axiosConfig'
import { connect } from 'react-redux'

// CSS imports
import styles from './css/SongController.css'

// Component imports
import FontAwesome from 'react-fontawesome'

// Component
class PauseButton extends Component {
  render() {
    return (
      <div className={styles.container}>
        <FontAwesome name="pause" className={styles.icon} />
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
export default connect(mapStateToProps)(PauseButton)
