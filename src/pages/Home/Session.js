/*
 * Author: David Shefcik
 * Created: 11/23/19
 * Project | File: Spotify Queue Client | src/pages/Home/Session.js
 */

// Module imports
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// CSS imports
import styles from './css/Session.css'

// Component props
import Button from '../../components/Button'

// Component
class Session extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textArea}>
            <p className={styles.title}>Hello, {this.props.username}.</p>
          </div>
          <div>
            <div>
              <Link to="/queue" title="My Queue">
                <Button text="My Queue" action={() => {}} />
              </Link>
            </div>
            <div>
              <Link to="/join" title="Join a Queue">
                <Button text="Join a Queue" action={() => {}} />
              </Link>
            </div>
            <div>
              <Link to="/logout" title="Logout">
                <Button text="Logout" action={() => {}} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Map state to props
const mapStateToProps = state => {
  return {
    username: state.user.user
  }
}

// Export
export default connect(mapStateToProps)(Session)
