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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

// Component
class PauseButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      icon: faPause,
      text: 'Pause'
    }
    this.click = this.click.bind(this)
  }
  componentDidMount() {
    if (this.props.playing === 'true') {
      this.setState({
        icon: faPause,
        text: 'Pause'
      })
    } else {
      this.setState({
        icon: faPlay,
        text: 'Resume'
      })
    }
  }
  click() {
    let token = this.props.token
    axiosConfig
      .post('/song/pause', { id: this.props.queueid }, { headers: { token } })
      .then(res => {
        if (res['data']['message'] === 'device') {
          window.alert('No Spotify client found!')
        } else {
          if (res['data']['event'] === 'pause') {
            this.setState({
              icon: faPlay,
              text: 'Resume'
            })
          } else if (res['data']['event'] === 'resume') {
            this.setState({
              icon: faPause,
              text: 'Pause'
            })
          }
        }
      })
      .catch(error => {
        if (process.env.PRODUCTION === 'false') {
          console.log(error)
        }
        window.alert('Unable to complete your request! Please try again.')
      })
  }
  render() {
    return (
      <div className={styles.container} onClick={this.click}>
        <FontAwesomeIcon
          icon={this.state.icon}
          size="lg"
          className={styles.icon}
          title={this.state.text}
        />
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
