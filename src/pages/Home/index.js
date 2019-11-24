/*
 * Author: David Shefcik
 * Created: 11/18/19
 * Project | File: Spotify Queue Client | src/pages/Home/index.js
 */

// Module imports
import React, { Component } from 'react'
import { connect } from 'react-redux'

// CSS imports
import './css/Home.css'

// Component imports
import Default from './Default'
import Session from './Session'
import LoadingPage from '../../components/LoadingPage'

// Component
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageContent: <LoadingPage text="Please wait" />
    }
  }
  componentDidMount() {
    let token = this.props.token
    let user = this.props.username

    if (
      Object.entries(token).length === 0 ||
      Object.entries(user).length === 0
    ) {
      this.setState({
        pageContent: <Default />
      })
    } else {
      this.setState({
        pageContent: <Session />
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
export default connect(mapStateToProps)(Home)
