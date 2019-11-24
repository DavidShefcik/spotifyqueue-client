/*
 * Author: David Shefcik
 * Created: 11/23/19
 * Project | File: Spotify Queue Client | src/containers/QueuePage.js
 */

// Module imports
import React, { Component } from 'react'
import axiosConfig from '../modules/axiosConfig'
import { connect } from 'react-redux'

// CSS imports
import styles from './css/QueuePage.css'

// Component
class QueuePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queueid: '',
      code: '',
      members: [],
      songs: [],
      ownerid: '',
      ownerName: ''
    }
  }
  componentDidMount() {
    let token = this.props.token

    axiosConfig
      .get('/queue/' + this.props.id, { headers: { token: token } })
      .then(res => {
        this.setState({
          queueid: res['data']['queue']['queueid'],
          code: res['data']['queue']['code'],
          members: res['data']['queue']['members'],
          songs: res['data']['queue']['songs'],
          ownerid: res['data']['queue']['ownerid']
        })
        axiosConfig
          .get('/users/' + this.state.ownerid, { headers: { token: token } })
          .then(res => {
            this.setState({
              ownerName: res['data']['user']['username']
            })
          })
          .catch(error => {
            if (process.env.PRODUCTION === 'false') {
              console.log(error)
            }
            this.props.history.push('/error')
          })
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
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <p className={styles.code}>Code here</p>
            <p className={styles.title}>
              {this.state.ownerName}'s Spotify Queue
            </p>
          </div>
        </div>
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
export default connect(mapStateToProps)(QueuePage)
