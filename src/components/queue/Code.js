/*
 * Author: David Shefcik
 * Created: 11/24/19
 * Project | File: Spotify Queue Client | src/components/Code.js
 */

// Module imports
import React, { Component } from 'react'
import axiosConfig from '../../modules/axiosConfig'
import { connect } from 'react-redux'

// CSS imports
import styles from './css/Code.css'

// Component
class Code extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 30,
      code: '',
      renderCode: false
    }
  }
  componentDidMount() {
    let token = this.props.token
    axiosConfig
      .get('/queue/' + this.props.queueid + '/isowner', {
        headers: { token: token }
      })
      .then(r => {
        if (r['data']['isOwner']) {
          this.setState(
            {
              code: this.props.code,
              renderCode: true
            },
            () => {
              this.interval = setInterval(() => {
                let count = this.state.count
                if (count <= 0) {
                  axiosConfig
                    .post(
                      '/queue/code/update',
                      { id: this.props.queueid },
                      { headers: { token: token } }
                    )
                    .then(res => {
                      count = 30
                      this.setState({
                        count: count,
                        code: res['data']['code']
                      })
                    })
                    .catch(error => {
                      if (process.env.PRODUCTION === 'false') {
                        console.log(error)
                      }
                      this.props.history.push('/error')
                    })
                } else {
                  count -= 1
                  this.setState({
                    count: count
                  })
                }
              }, 1000)
            }
          )
        } else {
          this.setState({
            code: this.props.code,
            renderCode: true
          })
          this.interval = null
        }
      })
      .catch(error => {
        if (process.env.PRODUCTION === 'false') {
          console.log(error)
        }
        this.props.history.push('/error')
      })
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    return (
      <span className={styles.container}>
        {this.state.renderCode ? (
          this.state.code.split('').map((value, index) => {
            return (
              <ul key={index} className={styles.code}>
                <li>{value}</li>
              </ul>
            )
          })
        ) : (
          <p>Hello</p>
        )}
      </span>
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
export default connect(mapStateToProps)(Code)
