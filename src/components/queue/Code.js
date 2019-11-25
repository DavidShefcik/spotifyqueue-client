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
      length: 150,
      renderCode: false
    }
  }
  componentDidMount() {
    let token = this.props.token
    if (this.props.isOwner) {
      this.setState(
        {
          code: this.props.code,
          renderCode: true
        },
        () => {
          this.interval = setInterval(() => {
            let count = this.state.count
            let length = this.state.length
            if (length <= 0) {
              this.setState({
                length: 150
              })
            } else {
              length = length - 5
              this.setState({
                length: length
              })
            }
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
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    return (
      <span className={styles.container}>
        <ul className={styles.code}>
          {this.state.renderCode ? (
            this.state.code.split('').map((value, index) => {
              return <li key={index}>{value}</li>
            })
          ) : (
            <p>Wait a second</p>
          )}
        </ul>
        {this.props.isOwner ? (
          <hr
            className={styles.line}
            style={{
              width: `${this.state.length}px`
            }}
          />
        ) : (
          <span />
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
