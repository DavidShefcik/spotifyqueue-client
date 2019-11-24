/*
 * Author: David Shefcik
 * Created: 11/23/19
 * Project | File: Spotify Queue Client | src/pages/Queue.js
 */

// Module imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import axiosConfig from '../modules/axiosConfig'

// Component imports
import QueuePage from '../containers/QueuePage'
import LoadingPage from '../components/LoadingPage'

// Component
class Queue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageContent: <LoadingPage text="Creating your queue" />
    }
  }
  componentDidMount() {
    let token = this.props.token
    let user = this.props.username

    if (
      Object.entries(token).length === 0 ||
      Object.entries(user).length === 0
    ) {
      this.props.history.push('/')
    } else {
      axiosConfig
        .post('/queue/create', null, { headers: { token: token } })
        .then(res => {
          this.setState({
            pageContent: (
              <QueuePage
                id={res['data']['queueid']}
                history={this.props.history}
              />
            )
          })
        })
        .catch(error => {
          if (process.env.PRODUCTION === 'false') {
            console.log(error)
          }
          this.props.history.push('/error')
        })
    }
  }
  render() {
    return <div>{this.state.pageContent}</div>
  }
}

// Map state to props
const mapStateToProps = state => {
  return {
    username: state.user.user,
    token: state.token.token
  }
}

// Export
export default connect(mapStateToProps)(Queue)
